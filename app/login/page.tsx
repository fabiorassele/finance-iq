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
    <div className="relative grid h-full grid-cols-1 overflow-hidden">
      {/* Background com Gradiente e Elementos Gráficos */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#222] opacity-90"></div>

      <div className="relative z-10 w-full md:order-1 md:mx-auto md:flex md:max-w-[550px] md:items-center md:justify-center md:p-8">
        <div className="absolute inset-0 h-96 w-full md:hidden">
          <Image
            src="/login2.jpg"
            alt="Faça login"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 text-center text-white md:relative md:bg-transparent lg:flex">
          {/* Logotipo com animação */}
          <Image
            src="/logotipo-branco.svg"
            alt="Fintrack.AI"
            width={300}
            height={200}
            className="mb-4 transform animate-pulse transition-all duration-500 ease-in-out hover:scale-105"
          />

          <h1 className="text-shadow-md mb-4 text-4xl font-extrabold md:text-2xl">
            Bem Vindo
          </h1>

          <p className="mb-6 px-4 text-sm text-muted-foreground md:px-0 md:text-base">
            A Fintrack.AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, oferecer insights personalizados,
            facilitando o controle do seu orçamento.
          </p>

          {/* Botão com transição suave e animação */}
          <SignInButton>
            <Button className="transform bg-white text-black shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 hover:shadow-xl">
              <LogInIcon className="mr-2" />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
