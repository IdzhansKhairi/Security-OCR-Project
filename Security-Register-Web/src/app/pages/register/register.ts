import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnDestroy {

  cameraOn = false
  photoCaptured = false;
  private stream: MediaStream | null = null;

  async toggleCamera(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const video = document.getElementById('camera') as HTMLVideoElement;

    if (checkbox.checked) {
      // Turn ON camera
      try {
        this.cameraOn = true;
        this.photoCaptured = false;
        await new Promise(resolve => setTimeout(resolve, 0));

        const video = document.getElementById('camera') as HTMLVideoElement;
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = this.stream;
        video.classList.remove('d-none');
      } catch (err) {
        console.error('Camera access denied:', err);
        checkbox.checked = false;
        this.cameraOn = false;
        this.photoCaptured = false;
      }
    } 
    else {
      // Turn OFF camera
      this.stopCamera(video);
      this.cameraOn = false;
      this.photoCaptured = false;
    }
  }

  capturePhoto() {
    const video = document.getElementById('camera') as HTMLVideoElement;
    let canvas = document.getElementById('snapshot') as HTMLCanvasElement;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'snapshot';
      document.body.appendChild(canvas); // temporary fallback
    }

    const context = canvas.getContext('2d');
    if (context && video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.classList.remove('d-none');
      this.photoCaptured = true;
    } else {
      console.warn('Canvas context not ready or video not loaded yet.');
    }

  }

  retakePhoto() {
    console.log('Retaking photo...');
    console.log(this.photoCaptured);
    console.log(this.cameraOn);
    this.photoCaptured = false;
    this.cameraOn = true;

    console.log(this.photoCaptured); 
    console.log(this.cameraOn); 
  }

  private stopCamera(video: HTMLVideoElement) {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    video.srcObject = null;
    video.classList.add('d-none');
  }

  ngOnDestroy() {
    // Stop camera if component destroyed
    const video = document.getElementById('camera') as HTMLVideoElement;
    this.stopCamera(video);
  }
}
