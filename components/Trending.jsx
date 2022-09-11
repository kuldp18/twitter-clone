const Trending = ({ result }) => {
  const { img, tags, heading, description } = result;
  return <div className="text-white">{description}</div>;
};

export default Trending;
