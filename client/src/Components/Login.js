function Login() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className="bg-light w-50 shadow-sm p-3 ">
        <h1>Login</h1>

        <form action="" method="POST">
          <div className="form-group">
            <label htmlFor="username fw-bold">Username</label>
            <input type="text" name="username" required />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
