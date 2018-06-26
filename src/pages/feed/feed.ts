import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  user;
  products;
  amount = 0;
  items = [];
  frios;
  carnes;
  hortifruti;
  congelados;
  mercearia;
  mercados;
  bebidas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController
  ) {
    this.getCurrentUser();
    this.getProducts();
    this.getFrios();
    this.getCongelados();
    this.getCarnes();
    this.getHortifruti();
    this.getMercearia();
    this.getMercados();
    this.getBebidas();
    this.loadingProvider.present();
  }

  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //Open product page
  open(p) {
    let modal = this.modalCtrl.create('ProductPage', { product: p });
    modal.present();
  }
  openMercado(p) {
    let modal = this.modalCtrl.create('MercadoPage', { product: p });
    modal.present();
  }

  //Open cart
  openCart() {
    let modal = this.modalCtrl.create('CartPage', { modal: true });
    modal.present();
  }

  //Open products
  openProducts() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }

  //Open frios
  openFrios() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }
  //Open carnes
  openCarnes() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }
  openCongelados() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }
  openHortifruti() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }
  openMercearia() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }
  openMercados() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }
  openBebidas() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }

  ionViewDidLoad() {
    //Build cart
    this.storage.get('cart_pizza_app')
      .then((res) => {
        if (res) {
          this.items = res;

          //Amount
          let i = 0;
          for (i; i < this.items.length; i++) {
            let price = parseFloat(this.items[i].price);
            this.amount = this.amount + price;
          }
        }
      })
  }

  //Get current user data
  getCurrentUser() {
    this.storage.get('user_pizza_app')
      .then((user) => {
        this.user = user;
      })
  }

  //List all produtcs to slides
  getProducts() {
    this.firebaseProvider.getProducts()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.products = res;
      })
  }

  //List all frios to slides
  getFrios() {
    this.firebaseProvider.getFrios()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.frios = res;
      })
  }
  //List all congelados to slides
  getCongelados() {
    this.firebaseProvider.getCongelados()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.congelados = res;
      })
  }
  //List all carnes to slides
  getCarnes() {
    this.firebaseProvider.getCarnes()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.carnes = res;
      })
  }
  //List all hortifruti to slides
  getHortifruti() {
    this.firebaseProvider.getHortifruti()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.hortifruti = res;
      })
  }
  //List all mercearia to slides
  getMercearia() {
    this.firebaseProvider.getMercearia()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.mercearia = res;
      })
  }

  //List all mercados to slides
  getMercados() {
    this.firebaseProvider.getMercados()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.mercados = res;
      })
  }
  //List all bebidas to slides
  getBebidas() {
    this.firebaseProvider.getBebidas()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.bebidas = res;
      })
  }

  //Convert to price format
  toPrice(price) {
    price = parseFloat(price);
    return price.toFixed(2);
 }

}
