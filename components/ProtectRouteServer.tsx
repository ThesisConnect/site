// helpers/protectRouteServer.js
import axiosBaseurl from '@/config/baseUrl';

const protectRouteServer = async () => {
  try {
    const res = await axiosBaseurl.get('/auth/checkAuth', {
      withCredentials: true, // Forward the incoming request headers
    });
    const data = res.data;

    if (!data.isAuthenticated) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return {
      props: {}, // return empty props or add additional props if needed
    };
  } catch (err) {
    // If an error occurs or the user isn't authenticated, redirect to login
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default protectRouteServer;
