import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resume',
  standalone: false,
  templateUrl: './resume.html',
  styleUrl: './resume.scss'
})
export class Resume {
  
  clickDownload() {
    Swal.fire({
      title: 'Downloaded successfully!',
      icon: "success",
    })
  }

}
