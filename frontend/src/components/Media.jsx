import React from 'react';
import { Play, Download } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const downloads = ['Show Music (PDF)', 'Drill Charts (PDF)', 'Band Handbook (PDF)'];

const Media = () => {
  const { content } = useContent();
  const photos = content.media?.photos || [];
  const videos = content.media?.videos || [];

  return (
    <section
      id="media"
      data-testid="media-section"
      className="bg-[#FDFDFD] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#2d6a27] font-heading mb-3">
            Gallery &amp; Video
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase leading-none text-[#0A0A0A] font-heading">
            Media
          </h2>
          <div className="w-24 h-1 bg-[#c8a227] mt-4 border border-[#0A0A0A]" />
        </div>

        {/* Photo Gallery */}
        <h3
          data-testid="media-gallery-heading"
          className="text-base font-bold uppercase tracking-[0.2em] font-heading mb-5 text-[#0A0A0A]"
        >
          Photo Gallery
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          {photos.map((photo, i) => (
            <div
              key={i}
              data-testid={`media-photo-${i}`}
              className="border-2 border-[#0A0A0A] hover:-translate-y-1 transition-transform duration-300 shadow-[4px_4px_0px_#0A0A0A] cursor-pointer group overflow-hidden"
              style={{ backgroundColor: photo.color || '#2d6a27', aspectRatio: '4/3' }}
            >
              {photo.imageUrl ? (
                <img
                  src={photo.imageUrl}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest text-center px-4 group-hover:text-white/70 transition-colors">
                    {photo.label}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Videos */}
        <h3
          data-testid="media-video-heading"
          className="text-base font-bold uppercase tracking-[0.2em] font-heading mb-5 text-[#0A0A0A]"
        >
          Performance Videos
        </h3>
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {videos.map((video, i) => (
            <div
              key={i}
              data-testid={`media-video-${i}`}
              className="border-2 border-[#0A0A0A] flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300 shadow-[4px_4px_0px_#c8a227] cursor-pointer group"
              style={{ backgroundColor: video.color || '#0A0A0A', aspectRatio: '16/9' }}
              onClick={() => video.videoUrl && window.open(video.videoUrl, '_blank')}
            >
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mb-3 group-hover:bg-[#c8a227] group-hover:border-[#c8a227] transition-all duration-200">
                <Play size={18} className="text-white ml-0.5" />
              </div>
              <p className="text-white/50 text-xs font-mono uppercase tracking-wider text-center px-4 group-hover:text-white/80 transition-colors">
                {video.label}
              </p>
            </div>
          ))}
        </div>

        {/* Downloads */}
        <div className="bg-[#F3F4F6] border-2 border-[#0A0A0A] p-8 shadow-[4px_4px_0px_#0A0A0A]">
          <h3 className="text-base font-bold uppercase tracking-[0.2em] font-heading mb-5 text-[#0A0A0A]">
            Downloads
          </h3>
          <div className="flex flex-wrap gap-4">
            {downloads.map((doc) => (
              <a
                key={doc}
                href="#"
                data-testid={`download-${doc.toLowerCase().replace(/[\s()]/g, '-')}`}
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-[#0A0A0A] bg-white text-xs font-bold uppercase tracking-[0.12em] font-heading hover:bg-[#2d6a27] hover:text-white transition-all duration-200 shadow-[2px_2px_0px_#0A0A0A]"
              >
                <Download size={14} />
                {doc}
              </a>
            ))}
          </div>
          <p className="text-xs text-[#6B7280] mt-4 font-body italic">
            * Download links will be activated by the director. Check back for the latest materials.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Media;
