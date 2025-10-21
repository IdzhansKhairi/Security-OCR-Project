import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})

export class Contact {
  
  // Initialize Email content
  senderName = ''
  senderEmail = ''
  senderPhone = ''
  senderTopic = ''
  emailTitle = ''
  emailContent =''
  
  sendEmail(contactForm: NgForm) {
    
    // Loading the whole page
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    if (contactForm.invalid) return;

    const templateParams = {
      name: this.senderName,
      email: this.senderEmail,
      phone: this.senderPhone || '-',
      topic: this.senderTopic,
      title: this.emailTitle,
      message: this.emailContent,
      time: new Date().toLocaleString()
    };

    // Use EmailJS to send
    emailjs.send(
      'IdzhansKhairi01',      // Service ID
      'template_o9q0emj',     // Template ID
      templateParams,
      '6vxXqmnPcfgZNASHK'     // Public Endpoint
    ).then((response) => {
        Swal.close();
        console.log('SUCCESS!', response.status, response.text);
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          text: 'Your message has been sent successfully.'
        });

        // Reset Form
        contactForm.resetForm(); 
        this.senderTopic = ''

    }, (error) => {
        console.log('FAILED...', error);
        Swal.fire({
          icon: 'error',
          title: 'Email Failed',
          text: 'Something went wrong. Please try again later.'
        });
    });
  }

}
