import {
  EllipsisHorizontalIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Moment from 'react-moment';
const Comment = ({ comment, id }) => {
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <img
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
      />

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{' '}
              </span>
            </div>{' '}
            &#8226;{' '}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll text-[15px] sm:text-base scrollbar-hide">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        {/* here */}
        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <ChatBubbleLeftIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
