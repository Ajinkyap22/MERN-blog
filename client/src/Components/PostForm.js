import { Editor } from "@tinymce/tinymce-react";

function PostForm(props) {
  return (
    <div>
      <h2>Create Blog Post</h2>

      <form>
        <Editor
          apiKey={process.env.REACT_APP_API_KEY}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
          }}
        ></Editor>
      </form>
    </div>
  );
}

export default PostForm;
