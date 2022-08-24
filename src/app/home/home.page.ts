import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

/*
  CREDITS
  ------------------------
  Author: Daniel David
  Date: 31/07/2022
  Version: 1.0
  ------------------------
  REFERENCES
  ------------------------
  https://ionicframework.com/docs/components/tabs/
  ------------------------
  DESCRIPTION
  ------------------------
  This is a basic calculator working with ionic grids
  ------------------------
  USAGE
  ------------------------
  ionic cordova build android
  ionic cordova run android
  ------------------------
  NOTES
  ------------------------
  Feel free to modify as you need this code, if you can give the author credit, please do so.
  ------------------------
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  // credits and about
  author: string = "Daniel David";
  version: string = "1.0.0";  


  result: string = "";
  operator: string = "";
  novo_operador: string = "";
  ope: string = "";
  num1: string = "";
  num2: string = "";
  control:boolean = false;

  constructor(public toastController: ToastController) {}

  
  async  toast(msg: string){
      const toast = await this.toastController.create({
        message: msg,
        duration: 3000
      });
      toast.present();
    
  }

  public backspace(){
    this.ope = this.ope.substring(0, this.ope.length - 1);
    if(this.num2.length > 0){
      this.num2 = this.num2.substring(0, this.num2.length - 1);
    } else {
      if(this.operator !== "") {this.operator = "";} else {this.num1 = this.num1.substring(0, this.num1.length - 1);}
    }
  }

  public addNumero(numero: string){
    if(this.control){
      this.ope = "";
      this.ope += numero;
      this.control = false;
      this.num1 = "";
      this.num2 = "";
    } else {this.ope += numero;}
    if(this.operator == ""){
      this.num1 += numero;
    } else {
      this.num2 += numero;
    }
    
  }
  
  public operacao(tipo: string){
    if(this.num2.length > 0){
      this.novo_operador = tipo;
      if(tipo == '%'){
        this.calcular("percentagem");
      } else {
        this.calcular();
      }
    } else {
      // verify if the this.ope contains a number or not, if not dont add the operator
      if(this.ope.length > 0 && this.operator.length == 0){
        this.ope += tipo;
      } else if (this.ope.length > 0 && this.operator != tipo){
        this.ope = this.ope.substring(0, this.ope.lastIndexOf(this.operator))
        this.ope += tipo;
      }
      if(this.num1.length > 0){this.operator = tipo; }
    }
  }

  public calcular(tipo: string = ""){
    let num1 = parseFloat(this.num1);
    let num2 = 0;
    if(tipo == "percentagem"){num2 = (parseFloat(this.num1) * parseFloat(this.num2) / 100)} else {num2 = parseFloat(this.num2)}
    let result = 0;
    let operador = this.operator;
    this.operator = this.novo_operador;
    this.ope += this.operator;
    this.novo_operador = "";
    alert('num1: ' + num1 + "\n num2: " + num2 + "\n operator?: " + this.operator)
    switch(operador){
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if(num1 == 0 || num2 == 0){
          this.toast("Não é possível dividir por zero!");
          result = 0;
          this.ope = "";
          this.num1 = "";
          this.num2 = "";
          this.result = "";
          return;
        }
        result = num1 / num2;
        break;
      case "%":
        result = num1 % num2;
        break;  
    }
    this.result = result.toString();
    this.num1 = result.toString();
    this.num2 = "";
    return result;
  }
    
  public showResult(){
    if(this.operator !== ""){
      if(this.num2.length > 0){
        this.ope = this.calcular().toString();
      } else {
        // verify if this.result is empty or not, if yes calculate the result
        if(this.result == ""){
          this.ope = this.calcular().toString();
        } else {
          this.ope = this.result;
        }
      }
      this.result = "";
      this.control = true;
    }
  }

  public limpar(){
    this.result = "";
    this.operator = "";
    this.novo_operador = "";
    this.ope = "";
    this.num1 = "";
    this.num2 = "";
  }
}