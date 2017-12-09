import { Component, OnInit, Inject } from '@angular/core';
// import { CollaborationService } from '../../services/collaboration.service';
import { DataService } from '../../services/data.service';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java';
  output: string;

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
        //Type your code here
      }
    }`,
    'C++': `#include <iostream>
    using namespace std;
    int main() {
    }`,
    'Python': `class Solution:
    def example():
      #write your Python code here`
  }

  constructor(private data: DataService, @Inject('collaboration') private collaboration) { }
  
  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    // this.collaboration.init()
  }
  setLanguage(language : string) : void {
    this.language = language;
    this.resetEditor();
  }
  resetEditor() : void {
    this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }
  submit() : void {
    let userCode = this.editor.getValue();
    console.log(userCode);
    let data = {
      user_code: userCode,
      lang: this.language.toLowerCase()
    };
    this.data.buildAndRun(data)
      .then((res) => {
        console.log(res);
        this.output = JSON.stringify(res);
        console.log(this.output );
      });
  }
}