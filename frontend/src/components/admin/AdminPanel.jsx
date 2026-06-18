import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LogOut, Save, Plus, Trash2, ChevronLeft, Check, AlertCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const SCHEDULE_TABS = [
  { id: 'rehearsals', label: 'Rehearsals' },
  { id: 'games', label: 'Football Games' },
  { id: 'competitions', label: 'Competitions' },
];
const MAIN_TABS = [
  { id: 'announcement', label: 'Announcement' },
  { id: 'about', label: 'About' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'media', label: 'Media & Images' },
  { id: 'contact', label: 'Contact' },
];

// ── Reusable Field component ──────────────────────────────────────
const Field = ({ label, value, onChange, multiline = false, placeholder = '', type = 'text' }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] font-heading mb-1.5">
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder={placeholder}
        className="w-full border-2 border-[#0A0A0A] p-3 rounded-none focus:outline-none focus:border-[#2d6a27] shadow-[2px_2px_0px_#0A0A0A] text-sm font-body resize-y"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-2 border-[#0A0A0A] p-3 rounded-none focus:outline-none focus:border-[#2d6a27] shadow-[2px_2px_0px_#0A0A0A] text-sm font-body"
      />
    )}
  </div>
);

const AdminPanel = ({ onLogout }) => {
  const { content, refreshContent } = useContent();
  const [activeTab, setActiveTab] = useState('announcement');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }

  // ── Local edit states ─────────────────────────────────────────
  const [announcement, setAnnouncement] = useState('');
  const [about, setAbout] = useState({ history: '', mission: '', community: '' });
  const [schedule, setSchedule] = useState({ rehearsals: [], games: [], competitions: [] });
  const [scheduleTab, setScheduleTab] = useState('rehearsals');
  const [media, setMedia] = useState({ photos: [], videos: [] });
  const [contactInfo, setContactInfo] = useState({ directorName: '', directorEmail: '' });

  // Sync from content context
  useEffect(() => {
    if (content) {
      setAnnouncement(content.announcement || '');
      setAbout(content.about || { history: '', mission: '', community: '' });
      setSchedule(content.schedule || { rehearsals: [], games: [], competitions: [] });
      setMedia(content.media || { photos: [], videos: [] });
      setContactInfo(content.contact || { directorName: '', directorEmail: '' });
    }
  }, [content]);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = async () => {
    await axios.post(`${BACKEND_URL}/api/auth/admin-logout`, {}, { withCredentials: true });
    onLogout();
  };

  const saveSection = async (section, data) => {
    setSaving(true);
    try {
      const updated = { ...content, [section]: data };
      await axios.put(`${BACKEND_URL}/api/content`, updated, { withCredentials: true });
      await refreshContent();
      showToast('success', 'Saved successfully!');
    } catch {
      showToast('error', 'Save failed. Please try again.');
    }
    setSaving(false);
  };

  // ── Schedule row ops ──────────────────────────────────────────
  const addRow = () =>
    setSchedule((p) => ({
      ...p,
      [scheduleTab]: [...(p[scheduleTab] || []), { date: '', time: '', event: '', location: '' }],
    }));

  const updateRow = (i, field, val) =>
    setSchedule((p) => ({
      ...p,
      [scheduleTab]: p[scheduleTab].map((r, idx) => (idx === i ? { ...r, [field]: val } : r)),
    }));

  const deleteRow = (i) =>
    setSchedule((p) => ({
      ...p,
      [scheduleTab]: p[scheduleTab].filter((_, idx) => idx !== i),
    }));

  // ── Media ops ─────────────────────────────────────────────────
  const updatePhoto = (i, field, val) =>
    setMedia((p) => ({ ...p, photos: p.photos.map((x, idx) => (idx === i ? { ...x, [field]: val } : x)) }));
  const deletePhoto = (i) =>
    setMedia((p) => ({ ...p, photos: p.photos.filter((_, idx) => idx !== i) }));
  const addPhoto = () =>
    setMedia((p) => ({ ...p, photos: [...p.photos, { label: 'New Photo', imageUrl: '', color: '#2d6a27' }] }));

  const updateVideo = (i, field, val) =>
    setMedia((p) => ({ ...p, videos: p.videos.map((x, idx) => (idx === i ? { ...x, [field]: val } : x)) }));
  const deleteVideo = (i) =>
    setMedia((p) => ({ ...p, videos: p.videos.filter((_, idx) => idx !== i) }));
  const addVideo = () =>
    setMedia((p) => ({ ...p, videos: [...p.videos, { label: 'New Video', videoUrl: '', color: '#0A0A0A' }] }));

  // ── Save Button ───────────────────────────────────────────────
  const SaveBtn = ({ onClick, label = 'Save Changes' }) => (
    <button
      onClick={onClick}
      disabled={saving}
      data-testid={`admin-save-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="inline-flex items-center gap-2 bg-[#2d6a27] text-white px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#0A0A0A] transition-all duration-200 font-heading disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Save size={14} />
      {saving ? 'Saving...' : label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0A0A0A] border-b-2 border-[#c8a227]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-white transition-colors font-body"
            >
              <ChevronLeft size={13} />
              Back to Site
            </Link>
            <div className="w-px h-4 bg-white/20" />
            <div>
              <p className="text-sm font-black uppercase font-heading text-white">Admin Panel</p>
              <p className="text-xs text-[#6B7280] font-body">Ike Instrumental Marching Band</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            data-testid="admin-logout-button"
            className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white transition-colors font-body"
          >
            <LogOut size={13} />
            Logout
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] text-sm font-bold uppercase tracking-wider font-heading ${
            toast.type === 'success' ? 'bg-[#2d6a27] text-white' : 'bg-red-500 text-white'
          }`}
        >
          {toast.type === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
          {toast.msg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Main Tabs */}
        <div className="flex flex-wrap border-2 border-[#0A0A0A] mb-8 bg-white w-fit">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              data-testid={`admin-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] font-heading transition-all border-r-2 border-[#0A0A0A] last:border-r-0 ${
                activeTab === tab.id
                  ? 'bg-[#2d6a27] text-white'
                  : 'bg-white text-[#0A0A0A] hover:bg-[#F3F4F6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white border-2 border-[#0A0A0A] p-8 shadow-[4px_4px_0px_#0A0A0A]">

          {/* ── ANNOUNCEMENT ─────────────────────── */}
          {activeTab === 'announcement' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold uppercase font-heading mb-1">Announcement Banner</h2>
                <p className="text-sm text-[#6B7280] font-body">Appears at the very top of every page.</p>
              </div>
              <Field
                label="Announcement Text"
                value={announcement}
                onChange={setAnnouncement}
                placeholder="e.g. Upcoming Event: Leadership Camp – June 24"
              />
              <SaveBtn onClick={() => saveSection('announcement', announcement)} />
            </div>
          )}

          {/* ── ABOUT ────────────────────────────── */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase font-heading">About Section</h2>
              <Field
                label="Our History"
                value={about.history || ''}
                onChange={(v) => setAbout((p) => ({ ...p, history: v }))}
                multiline
              />
              <Field
                label="Our Mission"
                value={about.mission || ''}
                onChange={(v) => setAbout((p) => ({ ...p, mission: v }))}
                multiline
              />
              <Field
                label="Community Pride"
                value={about.community || ''}
                onChange={(v) => setAbout((p) => ({ ...p, community: v }))}
                multiline
              />
              <SaveBtn onClick={() => saveSection('about', about)} />
            </div>
          )}

          {/* ── SCHEDULE ─────────────────────────── */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase font-heading">Schedule</h2>

              {/* Sub-tabs */}
              <div className="flex flex-wrap border-2 border-[#0A0A0A] w-fit">
                {SCHEDULE_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setScheduleTab(t.id)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] font-heading transition-all border-r-2 border-[#0A0A0A] last:border-r-0 ${
                      scheduleTab === t.id ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#0A0A0A] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Editable table */}
              <div className="overflow-x-auto border-2 border-[#0A0A0A]">
                <table className="w-full border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-[#0A0A0A] text-white">
                      {['Date', 'Event', 'Location', 'Time', ''].map((h) => (
                        <th key={h} className="p-2 text-left text-xs font-bold uppercase tracking-wider font-heading border-r border-white/10 last:border-r-0">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(schedule[scheduleTab] || []).map((row, i) => (
                      <tr key={i} className="border-b border-[#E5E7EB] last:border-b-0">
                        {['date', 'event', 'location', 'time'].map((field) => (
                          <td key={field} className="p-1.5 border-r border-[#E5E7EB]">
                            <input
                              type="text"
                              value={row[field] || ''}
                              onChange={(e) => updateRow(i, field, e.target.value)}
                              data-testid={`schedule-input-${i}-${field}`}
                              className="w-full text-sm p-1.5 border border-transparent hover:border-[#D1D5DB] focus:border-[#2d6a27] focus:outline-none font-body bg-transparent"
                              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            />
                          </td>
                        ))}
                        <td className="p-1.5 text-center">
                          <button
                            onClick={() => deleteRow(i)}
                            data-testid={`schedule-delete-row-${i}`}
                            className="text-red-400 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {(schedule[scheduleTab] || []).length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-sm text-[#9CA3AF] font-body italic">
                          No rows yet. Click &quot;Add Row&quot; to add one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={addRow}
                  data-testid="schedule-add-row"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#0A0A0A] bg-white text-xs font-bold uppercase tracking-wider font-heading hover:bg-[#F3F4F6] transition-colors shadow-[2px_2px_0px_#0A0A0A]"
                >
                  <Plus size={13} /> Add Row
                </button>
                <SaveBtn onClick={() => saveSection('schedule', schedule)} label="Save Schedule" />
              </div>
            </div>
          )}

          {/* ── MEDIA ────────────────────────────── */}
          {activeTab === 'media' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold uppercase font-heading mb-1">Media &amp; Images</h2>
                <p className="text-sm text-[#6B7280] font-body">
                  Paste a public image URL to replace a color placeholder. Leave empty to keep the placeholder.
                  For videos, paste a YouTube link — clicking the play button will open it.
                </p>
              </div>

              {/* Photos */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-heading mb-4 text-[#0A0A0A]">
                  Photo Gallery
                </h3>
                <div className="space-y-3">
                  {(media.photos || []).map((photo, i) => (
                    <div key={i} className="flex gap-3 items-center border border-[#E5E7EB] p-3 bg-[#FAFAFA]">
                      <div
                        className="w-14 h-10 flex-shrink-0 border border-[#E5E7EB] overflow-hidden"
                        style={{ backgroundColor: photo.color }}
                      >
                        {photo.imageUrl && (
                          <img
                            src={photo.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                      </div>
                      <input
                        type="text"
                        value={photo.label || ''}
                        onChange={(e) => updatePhoto(i, 'label', e.target.value)}
                        placeholder="Caption"
                        className="flex-1 min-w-0 text-sm p-2 border border-[#D1D5DB] focus:outline-none focus:border-[#2d6a27] font-body"
                      />
                      <input
                        type="url"
                        value={photo.imageUrl || ''}
                        onChange={(e) => updatePhoto(i, 'imageUrl', e.target.value)}
                        placeholder="Image URL (optional)"
                        className="flex-[2] min-w-0 text-sm p-2 border border-[#D1D5DB] focus:outline-none focus:border-[#2d6a27] font-body"
                      />
                      <button
                        onClick={() => deletePhoto(i)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addPhoto}
                  data-testid="media-add-photo"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 border-2 border-[#0A0A0A] bg-white text-xs font-bold uppercase tracking-wider font-heading hover:bg-[#F3F4F6] transition-colors shadow-[2px_2px_0px_#0A0A0A]"
                >
                  <Plus size={13} /> Add Photo
                </button>
              </div>

              {/* Videos */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-heading mb-4 text-[#0A0A0A]">
                  Performance Videos
                </h3>
                <div className="space-y-3">
                  {(media.videos || []).map((video, i) => (
                    <div key={i} className="flex gap-3 items-center border border-[#E5E7EB] p-3 bg-[#FAFAFA]">
                      <div
                        className="w-14 h-10 flex-shrink-0 border border-[#E5E7EB] flex items-center justify-center"
                        style={{ backgroundColor: video.color }}
                      >
                        <span className="text-white/50 text-xs">&#9654;</span>
                      </div>
                      <input
                        type="text"
                        value={video.label || ''}
                        onChange={(e) => updateVideo(i, 'label', e.target.value)}
                        placeholder="Video title"
                        className="flex-1 min-w-0 text-sm p-2 border border-[#D1D5DB] focus:outline-none focus:border-[#2d6a27] font-body"
                      />
                      <input
                        type="url"
                        value={video.videoUrl || ''}
                        onChange={(e) => updateVideo(i, 'videoUrl', e.target.value)}
                        placeholder="YouTube/Video URL (optional)"
                        className="flex-[2] min-w-0 text-sm p-2 border border-[#D1D5DB] focus:outline-none focus:border-[#2d6a27] font-body"
                      />
                      <button
                        onClick={() => deleteVideo(i)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addVideo}
                  data-testid="media-add-video"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 border-2 border-[#0A0A0A] bg-white text-xs font-bold uppercase tracking-wider font-heading hover:bg-[#F3F4F6] transition-colors shadow-[2px_2px_0px_#0A0A0A]"
                >
                  <Plus size={13} /> Add Video
                </button>
              </div>

              <SaveBtn onClick={() => saveSection('media', media)} label="Save Media" />
            </div>
          )}

          {/* ── CONTACT ──────────────────────────── */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase font-heading">Contact Info</h2>
              <Field
                label="Director Name"
                value={contactInfo.directorName || ''}
                onChange={(v) => setContactInfo((p) => ({ ...p, directorName: v }))}
                placeholder="e.g. Mr. Johnson"
              />
              <Field
                label="Director Email"
                value={contactInfo.directorEmail || ''}
                onChange={(v) => setContactInfo((p) => ({ ...p, directorEmail: v }))}
                placeholder="e.g. director@eisenhowerhighschool.edu"
                type="email"
              />
              <div className="bg-[#F3F4F6] border-2 border-[#0A0A0A] p-4">
                <p className="text-xs font-bold uppercase tracking-wider font-heading mb-1">Instagram</p>
                <p className="text-sm font-body text-[#495057]">@ikeinstrumental (fixed)</p>
              </div>
              <SaveBtn onClick={() => saveSection('contact', contactInfo)} label="Save Contact" />
            </div>
          )}

        </div>

        <p className="text-xs text-[#9CA3AF] font-body mt-5 text-center">
          Changes save to the database instantly and appear on the site on next page load.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
