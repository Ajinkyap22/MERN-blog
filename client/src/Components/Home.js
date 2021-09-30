import Preview from "./Preview";

function Home(props) {
  return (
    <div className="row w-100">
      {props.posts.map((post) => (
        <div className="col" key={post._id}>
          <Preview {...post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
