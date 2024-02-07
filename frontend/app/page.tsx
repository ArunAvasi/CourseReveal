import SignInWithGoogle from "./components/SignInWithGoogle";

export default function LogInPage() {
  return (
    <main>
      <div className="flex flex-col h-screen">
        <h1 className="font-title text-offWhite text-center sm:my-20 sm:text-7xl my-14 text-6xl">
          Course Reveal
        </h1>
        <div className="flex-grow bg-offGrey rounded-t-3xl">
          <div className="mx-auto sm:mt-24 mt-14 text-black sm:w-140 w-[22rem]">
            <h1 className="text-center sm:text-[3.75rem] text-[3.4rem] font-subtitle leading-normal">
              Let’s Make Schedule Sharing Easier
            </h1>
            <div className="flex items-center justify-center mt-12">
              <SignInWithGoogle/>
            </div>
            <div className="flex items-center justify-center mt-12">
              <h1 className="text-center font-default">
              To verify that you are a student, you must sign in with your school email.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
