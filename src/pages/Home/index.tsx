import marvelWallpaper from "./../../assets/img/marvel-wallpaper.jpg";
import "./home.scss";

const Home = () => {
  return (
    <main className="home-page">
      <img className="home-page-wallpaper" src={marvelWallpaper} alt="marvel" />
    </main>
  );
};

export default Home;
