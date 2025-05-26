"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { useRouter } from "next/navigation"
import { useForm  } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// type LoginRequest = {
//   username : String,
//   password : String
// }

const formSchema = z
  .object({
    username: z.string().min(2,{
      message:"Username must be at least 2 chars"
    }).max(50,{
      message:"Username must be 50 max chars"
    }),
    password: z.string().nonempty({
      message:"Password is required"
    }),
  })
  .required()

export function LoginForm({
  className,
  ...props
  
}: React.ComponentPropsWithoutRef<"div">) {

    // const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
          // defaultValues: {
          //   username: "",
          // },
    })

    const {
      register,
      handleSubmit,
       formState: { errors },
    } = form;

    function onSubmit(values: z.infer<typeof formSchema>){

      console.log(values)
 
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                {...register("username")}
                  id="name"
                  placeholder="name"
                />
                  <p className="text-red-500">{errors.username?.message}</p>
              </div>
              <div className="grid gap-2">
                 <Label htmlFor="name">Password</Label>
                <Input    {...register("password")}
                id="password" type="password"   placeholder="*******" />
                  <p className="text-red-500">{errors.password?.message}</p>
              </div>
              <Button  type="submit" className="w-full">
                Login
              </Button>
            
            </div>
          
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
