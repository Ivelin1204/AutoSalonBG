import { PageHero } from '../../components/ui/PageHero';
import { Reveal } from '../../components/ui/Reveal';
import { Slideshow } from '../../components/Slideshow';
import { GALLERY_IMAGES } from '../../data/gallery';
import { IMAGES } from '../../data/images';
import { SITE } from '../../data/site';
import './GalleryPage.css';

export default function GalleryPage() {
  return (
    <main className="page">
      <PageHero title="Галерия" image={IMAGES.galleryHero} height="42vh" mobileHeight="35vh" />

      <Slideshow images={GALLERY_IMAGES} />

      <Reveal delay={200}>
        <section className="video">
          <h2>Вижте ни в действие</h2>
          <div className="video__frame">
            <iframe src={SITE.videoEmbedUrl} title="Auto Salon BG – видео" loading="lazy" allowFullScreen />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
