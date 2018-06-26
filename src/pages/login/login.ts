import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    })
  }

  login() {
    this.loadingProvider.present();
    let data = this.form.value;
    this.authProvider.login(data)
      //Success
      .then((res) => {
        this.getAndSaveCurrentUser(res.user.uid);
      })
      //Error
      .catch(() => {
        this.loadingProvider.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: 'Algo deu errado. Por favor, tente mais uma vez.',
          buttons: ['Ok']
        });
        alert.present();
      })
  } 

  getAndSaveCurrentUser(uid){
    this.firebaseProvider.getCurrentUser(uid)
    .subscribe((res) => {
      this.loadingProvider.dismiss();
      let user = res[0];
      this.storage.set('user_pizza_app', user);
      this.app.getRootNav().setRoot('TabsPage');
    })
  }

  createAccount(){
    this.app.getRootNav().setRoot('CreateAccountPage');
  }

}
