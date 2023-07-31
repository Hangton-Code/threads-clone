import { SignInButton } from "./sign-in-button";

export default function SignInPage() {
  return (
    <div className="container h-full grid grid-rows-[1fr_min-content] py-8">
      <div className="flex flex-col justify-center items-center">
        <img src={"/threads-logo.png"} alt="" />
        <p className="mt-4 text-2xl font-semibold">Welcome Back</p>
      </div>
      <SignInButton />
    </div>
  );
}
