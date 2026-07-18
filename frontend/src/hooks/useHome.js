import { useEffect, useState } from "react";
import { getHomeData } from "../services/homeService";

function useHome() {
  const [loading, setLoading] = useState(true);

  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await getHomeData();

        setHomeData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  return {
    loading,
    homeData,
  };
}

export default useHome;
