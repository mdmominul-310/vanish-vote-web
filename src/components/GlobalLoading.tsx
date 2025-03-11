interface GlobalLoadingProps {
  loading: boolean;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-white">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoading;
