import { useEffect, useState } from "react";
import Preview from "./Preview";

function Dashboard(props) {
  const [published, setPublished] = useState([]);
  const [unpublished, setUnpublished] = useState([]);

  useEffect(() => {
    const publishedData = props.posts.filter(
      (post) => post.author._id === props.user._id && post.published
    );

    const unpublishedData = props.posts.filter(
      (post) => post.author._id === props.user._id && !post.published
    );

    setPublished(publishedData);
    setUnpublished(unpublishedData);
  }, [props]);

  return (
    <div>
      <h1>{`${props.user.username}'s Dashboard'`}</h1>

      <section>
        <h2>Published Posts</h2>
        <p hidden={published.length ? true : false}>
          You have no published posts.
        </p>

        <div className="row w-100" hidden={published.length ? false : true}>
          {published
            .filter((post) => post.published)
            .map((post) => (
              <div className="col" key={post._id}>
                <Preview {...post} />
              </div>
            ))}
        </div>
      </section>

      <section>
        <h2>Unpublished Posts</h2>
        <p hidden={unpublished.length ? true : false}>
          You have no unpublished posts.
        </p>

        <div className="row w-100" hidden={unpublished.length ? false : true}>
          {unpublished
            .filter((post) => !post.published)
            .map((post) => (
              <div className="col" key={post._id}>
                <Preview {...post} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
