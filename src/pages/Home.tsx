import React from "react";
import {
  Carousel,
  Tabs,
  BannerSection,
  DealGrid,
  LatestDealsSlider,
} from "../components/features";
import { CAROUSEL_IMAGES } from "../constants/carousel";
import { useNavigate } from "react-router-dom";
import { mockDeals } from "../types/deal";

/**
 * Home page component
 */
const Home: React.FC = () => {
  const navigate = useNavigate();

  // const handleCategoryChange = (category: string): void => {
  //   console.log("Category changed:", category);
  // };

  const handleExploreClick = (): void => {
    navigate("/deals");
  };

  const hotDeals = mockDeals.filter((deal) => deal.isHotDeal);

  return (
    <>
      {/* <DealCategories onCategoryChange={handleCategoryChange} /> */}

      {/* Carousel with dummy images */}
      <div className="w-full flex justify-center mt-4">
        <Carousel
          images={CAROUSEL_IMAGES}
          autoPlay={true}
          autoPlayInterval={4000}
        />
      </div>

      {/* Hot deals of the day (from mock data) */}
      {hotDeals.length > 0 && (
        <section className="w-full mt-8">
          <h2 className="text-xl font-semibold text-orange-600 mb-3">
            Hot Deals Today
          </h2>
          <DealGrid deals={hotDeals} />
        </section>
      )}

      {/* Latest Deals thumbnail slider */}
      <LatestDealsSlider />

      {/* Tabs left-aligned */}
      <div className="w-full mt-8">
        <Tabs />
      </div>

      {/* BannerSection */}
      <BannerSection onButtonClick={handleExploreClick} />
    </>
  );
};

export default Home;
