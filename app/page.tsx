import styles from './page.module.css'
import ImageSlider from '@/Components/ImageSlider'
import { photoData } from './BannerData';


const Home = async() => {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <ImageSlider banners={photoData} />
      </div>
    </main>
  );
};

export default Home;
