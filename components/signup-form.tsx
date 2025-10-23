"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePassword = (password: string) => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one capital letter"
    return ""
  }

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) return "Please confirm your password"
    if (confirmPassword !== password) return "Passwords do not match"
    return ""
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Real-time validation
    if (field === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }))
    }
    if (field === "password") {
      setErrors(prev => ({ 
        ...prev, 
        password: validatePassword(value),
        confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
      }))
    }
    if (field === "confirmPassword") {
      setErrors(prev => ({ 
        ...prev, 
        confirmPassword: validateConfirmPassword(value, formData.password)
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password)

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    })

    if (!emailError && !passwordError && !confirmPasswordError) {
      // Form is valid, submit here
      console.log("Form submitted:", formData)
    }
  }

  return (
    <form className={cn("flex flex-col gap-3 w-full max-w-[400px] mx-auto", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup className="space-y-2">
        <div className="flex flex-col items-center text-center mb-1">
          <h1 className="text-2xl font-bold py-2">Créez votre compte</h1>
          <p className="text-muted-foreground text-sm text-balance mt-0.5">
          Remplissez le formulaire ci-dessous pour créer votre compte
          </p>
        </div>
        
        {/* Name Field */}
        <Field>
          <FieldLabel htmlFor="name" className="mb-0.5">Nom complet</FieldLabel>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            required 
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Field>

        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email" className="mb-0.5">Email</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <FieldDescription className="text-destructive text-sm mt-0.5">
              {errors.email}
            </FieldDescription>
          )}
        </Field>

        {/* Password Field */}
        <Field>
          <FieldLabel htmlFor="password" className="mb-0.5">Mot de passe</FieldLabel>
          <Input 
            id="password" 
            type="password" 
            required 
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors.password && (
            <FieldDescription className="text-destructive text-sm mt-0.5">
              {errors.password}
            </FieldDescription>
          )}
        </Field>

        {/* Confirm Password Field */}
        <Field>
          <FieldLabel htmlFor="confirm-password" className="mb-0.5">Confirmer le mot de passe</FieldLabel>
          <Input 
            id="confirm-password" 
            type="password" 
            required 
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
          {errors.confirmPassword && (
            <FieldDescription className="text-destructive text-sm mt-0.5">
              {errors.confirmPassword}
            </FieldDescription>
          )}
        </Field>

        {/* Submit Button */}
        <Field>
          <Button type="submit" className="w-full mt-1">
          Créer le compte
          </Button>
        </Field>

        {/* Separator */}
        <FieldSeparator className="my-2">Ou continuer avec</FieldSeparator>

        {/* GitHub OAuth */}
        <Field className="space-y-2">
          <Button variant="outline" type="button" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
          <FieldDescription className="text-center">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-primary hover:underline">
              Se connecter
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}