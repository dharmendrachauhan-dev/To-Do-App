function Signup() {
  return (
    <>
        <div className="h-[calc(100vh-68px)] flex items-center justify-center bg-green-300">
          <div className="bg-amber-300 h-1/2 w-1/2 flex flex-col justify-center items-center">
            <form action="">
              <div className="flex justify-center flex-col items-center gap-4">
                <div>
                  <h1>Sign Up</h1>
                  <p>Are you member?</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="px-1 pt-2 border-b-2 border-slate-500 w-full placeholder-transparent focus-outline"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Gmail"
                    className="px-1 pt-2 border-b-2 border-slate-500 w-60"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="px-1 pt-2 border-b-2 border-slate-500 w-60"
                  />
                </div>
                <button className="bg-white">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}

export default Signup;
