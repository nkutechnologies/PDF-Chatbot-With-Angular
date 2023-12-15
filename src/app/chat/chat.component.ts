import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  selectedPdf: File | null = null;
  formmode = true;
  message: string = '';
  chatHistory: any[] = [];
  loading: boolean = false;


  constructor(
    private appService: ChatService,
    ) {}

  ngOnInit(): void {
    
  }

  handleButtonClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;

    if (fileInput) {
        fileInput.click();
    }
  }

  onFileSelected(event: any): void {
    this.selectedPdf = event.target.files[0];
  }

  uploadPdf(): void{
    if (this.selectedPdf) {
      this.loading = true;
      this.appService.uploadPdf(this.selectedPdf).subscribe((response) => {
        console.log('PDF uploaded successfully:', response);
      }).add(() => {
        this.loading = false;
      });
    }
  }
 
  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.loading = true; 
      this.appService.sendMessage(this.message).subscribe(
        (response) => {
          console.log('Chatbot response:', response);
          this.addToChatHistory(` ${this.message} :👤`, false); 
          this.addToChatHistory(`🤖: ${response.answer}`, true);
          this.message = '';
        },
      ).add(() => {
        this.loading = false;
      });
    }
  }

  addToChatHistory(message: string, isChatbot: boolean): void {
    this.chatHistory.push({
      message: message,
      isChatbot: isChatbot,
    });
  }

  onInputTypeChange(inputType: string): void {
    if (inputType === 'file') {
      this.uploadPdf();
    } else if (inputType === 'text') {
      this.sendMessage();
    }
  }
  
}
