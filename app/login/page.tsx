import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2">
      {/* Mobile Page */}
      <div className="relative w-full md:order-1 md:mx-auto md:flex md:max-w-[550px] md:items-center md:justify-center md:p-8">
        <div className="absolute inset-0 h-96 md:hidden">
          <Image
            src="/login.png"
            alt="Faça login"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center text-white md:relative md:bg-transparent lg:flex">
          <Image
            src="/logoImage.svg"
            alt="FinanceIQ"
            width={50.46}
            height={48.73}
            className="mb-4"
          />
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">FinanceIQ</h1>
          <p className="mb-6 px-4 text-sm md:px-0 md:text-base md:text-muted-foreground">
            A FinanceIQ é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, oferecer insights personalizados,
            facilitando o controle do seu orçamento.
          </p>
          <SignInButton>
            <Button className="bg-white text-black hover:bg-gray-200">
              <LogInIcon className="mr-2" />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        </div>
      </div>

      {/* Desktop Page */}
      <div className="relative hidden h-full overflow-hidden rounded-lg shadow-lg md:col-span-1 md:flex">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      </div>
    </div>
  );
};

export default LoginPage;
