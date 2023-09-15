// helpers/protectRouteServer.js
import axiosBaseurl from '@/config/baseUrl';

const protectRouteServer = async <T = any,>(
  additionalProps?: () => Promise<T>
) => {
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
    const propsData = additionalProps ? await additionalProps() : {};
    return {
      props: propsData,
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
// export const getServerSideProps = async (context) => {
//     const userId = context.params?.id;
//     return await protectRouteServer(async () => {
//       const userData = await getUserData(userId); // Using the userId directly here
//       return { user: userData };
//     });
//   };
