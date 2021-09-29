import Preview from "./Preview";

function Home(props) {
  return (
    <div className="row">
      {props.posts.map((post) => (
        <div className="col">
          <Preview {...post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
