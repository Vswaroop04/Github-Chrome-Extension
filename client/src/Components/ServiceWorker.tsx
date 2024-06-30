export default function Home() {
  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        import.meta.env.VITE_GITHUB_CLIENT_ID
    );
  }

  return (
    <div>
      <button onClick={loginWithGithub}>Login with GitHub</button>
    </div>
  );
}
