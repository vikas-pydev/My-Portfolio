// This service handles sending notifications via email and SMS
// when a user submits the contact form

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendNotifications(formData: ContactFormData) {
  try {
    // Send email notification
    await sendEmailNotification(formData)

    // Send SMS notification
    await sendSMSNotification(formData)

    return { success: true }
  } catch (error) {
    console.error("Error sending notifications:", error)
    return { success: false, error }
  }
}

async function sendEmailNotification(formData: ContactFormData) {
  // In a real implementation, this would use a service like SendGrid, Mailgun, etc.
  // For now, we'll just simulate the API call

  const emailContent = `
    New message from your portfolio website:
    
    From: ${formData.name} (${formData.email})
    Subject: ${formData.subject}
    
    Message:
    ${formData.message}
  `

  console.log("Sending email notification:", emailContent)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return true
}

async function sendSMSNotification(formData: ContactFormData) {
  // In a real implementation, this would use a service like Twilio, Nexmo, etc.
  // For now, we'll just simulate the API call

  // Create a brief summary for SMS
  const smsContent = `
    New contact from ${formData.name}
    Subject: ${formData.subject}
    
    Reply to: ${formData.email}
  `

  console.log("Sending SMS notification:", smsContent)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return true
}
