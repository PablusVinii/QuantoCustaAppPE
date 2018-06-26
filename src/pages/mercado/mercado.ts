import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-mercado',
  templateUrl: 'mercado.html',
})
export class MercadoPage {

  product;
  mercados;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.product = this.navParams.get('product');
    this.mercados = this.navParams.get('product.mercados');
  }

  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //Close modal
  close() {
    this.viewCtrl.dismiss();
  }

  //Add product to cart
  add() {
    let cart = [];
    this.storage.get('cart_pizza_app')
      .then((res) => {
        if (res) {
          cart = res;
        }

        //Push product to cart
        let product = {
          price: this.product.price,
          title: this.product.title,
          supermercado: this.product.supermercado
        };
        cart.push(product);

        //Save to storage
        this.storage.set('cart_pizza_app', cart)
          .then((res) => {
            const alert = this.alertCtrl.create({
              title: 'Eba!',
              subTitle: 'Já adicionamos ' + this.product.title + ' ao seu carrinho ;)',
              buttons: ['Ok']
            });
            alert.present();
          })
      })
  }

  //Convert to price format
  toPrice(price) {
    price = parseFloat(price);
    return price.toFixed(2);
  }


}
