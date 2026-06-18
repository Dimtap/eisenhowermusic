"""Backend tests for Ike Instrumental Marching Band CMS"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestContent:
    """Content API tests"""

    def test_get_content_returns_200(self):
        r = requests.get(f"{BASE_URL}/api/content")
        assert r.status_code == 200

    def test_get_content_has_required_keys(self):
        r = requests.get(f"{BASE_URL}/api/content")
        data = r.json()
        for key in ["announcement", "about", "schedule", "media", "contact"]:
            assert key in data, f"Missing key: {key}"

    def test_announcement_text(self):
        r = requests.get(f"{BASE_URL}/api/content")
        data = r.json()
        assert isinstance(data["announcement"], str)
        assert len(data["announcement"]) > 0

    def test_about_has_subkeys(self):
        r = requests.get(f"{BASE_URL}/api/content")
        data = r.json()
        about = data["about"]
        for key in ["history", "mission", "community"]:
            assert key in about

    def test_schedule_has_subkeys(self):
        r = requests.get(f"{BASE_URL}/api/content")
        data = r.json()
        sched = data["schedule"]
        for key in ["rehearsals", "games", "competitions"]:
            assert key in sched

    def test_schedule_rehearsals_not_empty(self):
        r = requests.get(f"{BASE_URL}/api/content")
        data = r.json()
        assert len(data["schedule"]["rehearsals"]) > 0


class TestAuth:
    """Auth endpoint tests"""

    def test_login_correct_password(self):
        r = requests.post(f"{BASE_URL}/api/auth/admin-login", json={"password": "Er!2Gx9kL4"})
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert data["message"] == "Login successful"

    def test_login_sets_cookie(self):
        r = requests.post(f"{BASE_URL}/api/auth/admin-login", json={"password": "Er!2Gx9kL4"})
        assert r.status_code == 200
        assert "access_token" in r.cookies

    def test_login_wrong_password(self):
        r = requests.post(f"{BASE_URL}/api/auth/admin-login", json={"password": "wrongpassword"})
        assert r.status_code == 401

    def test_login_wrong_password_error_message(self):
        r = requests.post(f"{BASE_URL}/api/auth/admin-login", json={"password": "wrongpassword"})
        data = r.json()
        assert "detail" in data

    def test_auth_me_without_token(self):
        r = requests.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401

    def test_auth_me_with_token(self):
        session = requests.Session()
        session.post(f"{BASE_URL}/api/auth/admin-login", json={"password": "Er!2Gx9kL4"})
        r = session.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 200
        data = r.json()
        assert data["authenticated"] == True

    def test_update_content_requires_auth(self):
        r = requests.put(f"{BASE_URL}/api/content", json={"announcement": "test"})
        assert r.status_code == 401

    def test_update_content_with_auth(self):
        session = requests.Session()
        session.post(f"{BASE_URL}/api/auth/admin-login", json={"password": "Er!2Gx9kL4"})
        # Get current content first
        content = session.get(f"{BASE_URL}/api/content").json()
        original = content["announcement"]
        # Update announcement
        content["announcement"] = "TEST_Updated Announcement"
        r = session.put(f"{BASE_URL}/api/content", json=content)
        assert r.status_code == 200
        # Verify persistence
        updated = session.get(f"{BASE_URL}/api/content").json()
        assert updated["announcement"] == "TEST_Updated Announcement"
        # Restore original
        content["announcement"] = original
        session.put(f"{BASE_URL}/api/content", json=content)

    def test_logout(self):
        session = requests.Session()
        session.post(f"{BASE_URL}/api/auth/admin-login", json={"password": "Er!2Gx9kL4"})
        r = session.post(f"{BASE_URL}/api/auth/admin-logout")
        assert r.status_code == 200
