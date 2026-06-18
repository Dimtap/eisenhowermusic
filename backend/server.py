from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, Request, HTTPException, Depends, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel

# ── Configuration ─────────────────────────────────────────────────
JWT_SECRET = os.environ.get("JWT_SECRET", "change-me-insecure-key")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

# ── Database ──────────────────────────────────────────────────────
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)

# ── Auth Helpers ──────────────────────────────────────────────────
def hash_pw(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()

def verify_pw(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())

def create_token(admin_id: str) -> str:
    payload = {
        "sub": admin_id,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def require_admin(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ── Default Content ───────────────────────────────────────────────
DEFAULT_CONTENT = {
    "announcement": "Upcoming Event: Leadership Camp \u2013 June 24",
    "about": {
        "history": "The Ike Instrumental Marching Band has been a proud tradition at Eisenhower High School since 1960. For over six decades, we have represented Rialto, California on fields across Southern California, bringing the spirit of excellence and precision to every performance.",
        "mission": "We believe that band is more than music \u2014 it is a school for life. Our program develops discipline, teamwork, and a commitment to musical excellence. Every student who marches with us learns to show up, work hard, and perform with pride.",
        "community": "The Ike Marching Band is a cornerstone of the Rialto community. From Friday night football games to regional competitions, we carry the Green and Gold with honor \u2014 inspiring students, families, and neighbors alike.",
    },
    "schedule": {
        "rehearsals": [
            {"date": "Jun 24, 2025", "time": "TBD", "event": "Leadership Camp", "location": "Eisenhower High School"},
            {"date": "Every Tuesday", "time": "3:30 PM \u2013 6:00 PM", "event": "Full Band Rehearsal", "location": "EHS Band Room & Field"},
            {"date": "Every Thursday", "time": "3:30 PM \u2013 6:00 PM", "event": "Full Band Rehearsal", "location": "EHS Band Room & Field"},
            {"date": "Select Saturdays", "time": "8:00 AM \u2013 12:00 PM", "event": "Pre-Competition Run-Through", "location": "EHS Field"},
            {"date": "Aug 4\u20138, 2025", "time": "8:00 AM \u2013 5:00 PM", "event": "Band Camp Week", "location": "Eisenhower High School"},
            {"date": "Aug 22, 2025", "time": "6:00 PM", "event": "Booster Meeting / Parent Night", "location": "EHS Auditorium"},
        ],
        "games": [
            {"date": "Sep 5, 2025", "time": "7:00 PM", "event": "Home vs. Colton HS", "location": "Eisenhower Stadium"},
            {"date": "Sep 12, 2025", "time": "7:00 PM", "event": "Away @ Fontana HS", "location": "Fontana HS Stadium"},
            {"date": "Sep 19, 2025", "time": "7:00 PM", "event": "Home vs. Bloomington HS", "location": "Eisenhower Stadium"},
            {"date": "Sep 26, 2025", "time": "7:00 PM", "event": "Away @ Cajon HS", "location": "Cajon HS Stadium"},
            {"date": "Oct 3, 2025", "time": "7:00 PM", "event": "Homecoming \u2013 Home vs. Pacific HS", "location": "Eisenhower Stadium"},
            {"date": "Oct 10, 2025", "time": "7:00 PM", "event": "Away @ Grand Terrace HS", "location": "Grand Terrace Stadium"},
            {"date": "Oct 17, 2025", "time": "7:00 PM", "event": "Home vs. Rialto HS", "location": "Eisenhower Stadium"},
        ],
        "competitions": [
            {"date": "Sep 27, 2025", "time": "8:00 AM", "event": "SCSBOA Prelims", "location": "Colton High School"},
            {"date": "Oct 11, 2025", "time": "8:00 AM", "event": "SCSBOA Field Show Invitational", "location": "Victor Valley HS"},
            {"date": "Oct 25, 2025", "time": "All Day", "event": "SCSBOA Semifinals", "location": "Citrus College, Glendora"},
            {"date": "Nov 1, 2025", "time": "All Day", "event": "CBA Invitational Championship", "location": "Ayala High School"},
            {"date": "Nov 8, 2025", "time": "All Day", "event": "CBA State Championship Finals", "location": "TBD"},
        ],
    },
    "media": {
        "photos": [
            {"label": "Football Game Performance", "imageUrl": "", "color": "#2d6a27"},
            {"label": "Competition Day", "imageUrl": "", "color": "#c8a227"},
            {"label": "Rehearsal Session", "imageUrl": "", "color": "#1d4a19"},
            {"label": "Drumline Feature", "imageUrl": "", "color": "#0A0A0A"},
            {"label": "Color Guard Performance", "imageUrl": "", "color": "#a68620"},
            {"label": "Halftime Show", "imageUrl": "", "color": "#3a7a33"},
        ],
        "videos": [
            {"label": "Halftime Show \u2013 Homecoming 2024", "videoUrl": "", "color": "#0A0A0A"},
            {"label": "SCSBOA Competition Performance", "videoUrl": "", "color": "#1d4a19"},
            {"label": "Full Band Showcase Night", "videoUrl": "", "color": "#0A0A0A"},
        ],
    },
    "contact": {
        "directorName": "Band Director",
        "directorEmail": "director@eisenhowerhighschool.edu",
    },
}

# ── Startup: Seed admin + default content ─────────────────────────
@app.on_event("startup")
async def on_startup():
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.admins.find_one({"role": "admin"})
    if not existing:
        await db.admins.insert_one({
            "role": "admin",
            "password_hash": hash_pw(admin_password),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    elif not verify_pw(admin_password, existing["password_hash"]):
        await db.admins.update_one(
            {"role": "admin"},
            {"$set": {"password_hash": hash_pw(admin_password)}},
        )

    existing_content = await db.site_content.find_one({"type": "site_content"})
    if not existing_content:
        await db.site_content.insert_one({"type": "site_content", **DEFAULT_CONTENT})

# ── Models ────────────────────────────────────────────────────────
class AdminLoginRequest(BaseModel):
    password: str

# ── Auth Endpoints ────────────────────────────────────────────────
@api_router.post("/auth/admin-login")
async def admin_login(data: AdminLoginRequest, response: Response):
    admin = await db.admins.find_one({"role": "admin"})
    if not admin or not verify_pw(data.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid password")
    token = create_token(str(admin["_id"]))
    response.set_cookie(
        key="access_token", value=token, httponly=True,
        secure=False, samesite="lax", max_age=86400, path="/"
    )
    return {"message": "Login successful", "role": "admin"}

@api_router.post("/auth/admin-logout")
async def admin_logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    return {"message": "Logged out"}

@api_router.get("/auth/me")
async def get_me(admin=Depends(require_admin)):
    return {"role": "admin", "authenticated": True}

# ── Content Endpoints ─────────────────────────────────────────────
@api_router.get("/content")
async def get_content():
    doc = await db.site_content.find_one({"type": "site_content"}, {"_id": 0, "type": 0})
    return doc or DEFAULT_CONTENT

@api_router.put("/content")
async def update_content(request: Request, admin=Depends(require_admin)):
    data = await request.json()
    data["type"] = "site_content"
    data.pop("_id", None)
    await db.site_content.replace_one({"type": "site_content"}, data, upsert=True)
    return {"message": "Content updated"}

# ── Misc ──────────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "Ike Instrumental Band API"}

app.include_router(api_router)

# ── CORS ──────────────────────────────────────────────────────────
_cors_raw = os.environ.get("CORS_ORIGINS", "http://localhost:3000")
_cors_origins = [o.strip() for o in _cors_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
