import { useForm} from "react-hook-form"
function App() {
 const {register , handleSubmit ,formState:{errors}, watch} = useForm()
 const password = watch('password')
 
 
 const onSubmit = handleSubmit((data)=>{
    console.log(data);
    
    console.log("form was successfully sended");
    
   })
 
  return (
   <form  onSubmit={onSubmit}>
    <label htmlFor="name">Name</label>
    <input type="text" {...register("name",{
      required:{
        value:true,
        message:"Email cannot be empty"
      },
      minLength:{
        value:2,
        message:"The name must be at least 2 characters"
      },
      maxLength:{
        value:20,
        message:"the mname must be less than 20 characters"
      }
      
      
    })} />
      {
    errors.name && <span>
      {String(errors.name.message)}
    </span>
    }
    <label htmlFor="email" >Email</label>
    <input type="email" {...register("email", {
      required:{
        value:true,
        message:"Email cannot be empty"
      },
      pattern:{
        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message:"Invalid email"

      }
      
      
    })} />

    {
    errors.email && <span>
      {String(errors.email.message)}
    </span>
    }

    <label htmlFor="password" >Password</label>
    <input type="password"  {...register("password",{
      required:{
        value:true,
        message:"The password cannot be empty"
      },
      minLength:{
        value:8,
        message:"the password must be at least 8 characters"
      },
      validate:(value)=>{
        const hasUppercase = /[A-Z]/.test(value);
        const hasSpecialChar = /[\W_]/.test(value);
        const hasNumber = /\d/.test(value);
        if (!hasUppercase) return "The password must contain at least one uppercase letter";
        if (!hasSpecialChar) return "The password must contain at least one special character";
        if (!hasNumber) return "The password must contain at least one number";
        
        return true
      }
    })} />

    {
      errors.password && <span>{String(errors.password.message)}</span>
    }

    <label htmlFor="confirmPassword" >Confirm Password</label>
    <input type="password"  {...register("confirmPassword",{
      
      required:{
        value:true,
        message: "Please confirm your password",
      },
      validate:(value) => {
       return value === password || "Passwords do not match"
      }
        
    })}/>

    {
      errors.confirmPassword && <span>{String(errors.confirmPassword.message)}</span>
    }

    <label htmlFor="birthdate" >Birthdate</label>
    <input type="date"  {...register("birthdate", {
      required:{
        value:true
        ,message:"the birthdate cannot be empty"
      },
      validate:(value) =>{
        const userBirthDate = new Date(value).getFullYear()
        const presentYear = new Date().getFullYear()
        
        if(presentYear-userBirthDate < 18){
          return "You must be of legal age"
        }
        else{
          return true
        }

      }
    })} />

    {
      errors.birthdate && <span>{String(errors.birthdate.message)}</span>
    }

    <label htmlFor="country" >Country</label>
    <select {...register("country")}>
      <option value="arg">Argentina</option>
      <option value="mx">Mexico</option>
      <option value="col">Colombia</option>
    </select>

    <label htmlFor="profilePicture" >Profile Picture</label>
    <input type="file" {...register("profilePicture")} />

    <label htmlFor="termsAndConditions" >Accept all terms and Conditions </label>
    <input type="checkbox"  {...register("termsAndConditions")} />

    <button type="submit">Submit</button>
   </form>
      
  )
}

export default App
