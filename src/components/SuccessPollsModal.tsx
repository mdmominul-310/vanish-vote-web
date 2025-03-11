interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToPolls: () => void;
  onShare: () => void;
}

const SuccessModalPOlls: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onGoToPolls,
  onShare,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold mb-2">
          Poll Created Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Your poll has been created. You can view it now or share it.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onGoToPolls}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Polls
          </button>
          <button
            onClick={onShare}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModalPOlls;
