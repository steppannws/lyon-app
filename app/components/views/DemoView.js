/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, Image, Alert } from 'react-native';
import { 
  Container, 
  Header, 
  Title, 
  Button, 
  Icon, 
  Content, 
  Badge, 
  Text, 
  Footer, 
  List,
  ListItem,
  InputGroup,
  Input,
  Picker,
  Item
} from 'native-base';

import PopupDialog from 'react-native-popup-dialog';
import theme from '../../Theme/theme';
import BottomMenu from '../ui/BottomMenu';

import api from '../../api';

export default class DemoView extends Component {

  constructor(props) {
      super(props);

      this.state = {
            selectedCountry: 'key0',
            selectedLanguage: 'lang0',
        }
  }

  componentDidMount() {
    this.refs.footer.setShow(true);
    var t = this;
    // setTimeout(function() {t.refs.footer.setShow(false)}, 5000);
  }

  countryPickerHandler (value: string) {
      this.setState({
          selectedCountry : value
      });
  }

  languagePickerHandler (value: string) {
      this.setState({
          selectedLanguage : value
      });
  }

  sendForm() {
    var data = '';
    // api.sendForm(data).then((responseData) => {
    //   console.warn(JSON.stringify(responseData));
    // })
    // return;
    
    Alert.alert(
      'Sent',
      'We send you an e-mail with Demo Account.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      )
  }

  render() {
    return (
      <Container theme={theme}>
        {/*<Header>
          <Title>Demo</Title>
        </Header>*/}

        <View style={{flex:1}}>

          <View style={{flex:1}}>
              <Content>
              <View style={{flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: 40,
                marginBottom: 40,
              }} >
                <Image style={{width: 200, height: 200}} source={require('../../images/logo-alpha.png')} />
              </View>  

              <List>
                  <ListItem>
                      <InputGroup >
                          <Icon name="ios-mail" />
                          <Input placeholder="E-mail" />
                      </InputGroup>
                  </ListItem>

                  <ListItem>
                      <InputGroup>
                          <Icon name="ios-person" />
                          <Input placeholder="Name"/>
                      </InputGroup>
                  </ListItem>

                  <ListItem>
                      <InputGroup>
                          <Icon name="ios-person" />
                          <Input placeholder="Lastname"/>
                      </InputGroup>
                  </ListItem>

                  <ListItem>

                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center',}}>
                          <Icon name="ios-globe" />
                        </View>
                        <View>
                          <Picker
                              iosHeader="Country"
                              mode="dropdown"
                              selectedValue={this.state.selectedCountry}
                              onValueChange={this.countryPickerHandler.bind(this)}>
                              <Item label="Country" value="key0" />
                                 <Item value="AF" label="Afghanistan" />
                                 <Item value="AX" label="Åland Islands" />
                                 <Item value="AL" label="Albania" />
                                 <Item value="DZ" label="Algeria" />
                                 <Item value="AS" label="American Samoa" />
                                 <Item value="AD" label="Andorra" />
                                 <Item value="AO" label="Angola" />
                                 <Item value="AI" label="Anguilla" />
                                 <Item value="AQ" label="Antarctica" />
                                 <Item value="AG" label="Antigua and Barbuda" />
                                 <Item value="AR" label="Argentina" />
                                 <Item value="AM" label="Armenia" />
                                 <Item value="AW" label="Aruba" />
                                 <Item value="AU" label="Australia" />
                                 <Item value="AT" label="Austria" />
                                 <Item value="AZ" label="Azerbaijan" />
                                 <Item value="BS" label="Bahamas" />
                                 <Item value="BH" label="Bahrain" />
                                 <Item value="BD" label="Bangladesh" />
                                 <Item value="BB" label="Barbados" />
                                 <Item value="BY" label="Belarus" />
                                 <Item value="BE" label="Belgium" />
                                 <Item value="BZ" label="Belize" />
                                 <Item value="BJ" label="Benin" />
                                 <Item value="BM" label="Bermuda" />
                                 <Item value="BT" label="Bhutan" />
                                 <Item value="BO" label="Bolivia" />
                                 <Item value="BA" label="Bosnia and Herzegovina" />
                                 <Item value="BW" label="Botswana" />
                                 <Item value="BV" label="Bouvet Island" />
                                 <Item value="BR" label="Brazil" />
                                 <Item value="IO" label="British Indian Ocean Territory" />
                                 <Item value="BN" label="Brunei Darussalam" />
                                 <Item value="BG" label="Bulgaria" />
                                 <Item value="BF" label="Burkina Faso" />
                                 <Item value="BI" label="Burundi" />
                                 <Item value="KH" label="Cambodia" />
                                 <Item value="CM" label="Cameroon" />
                                 <Item value="CA" label="Canada" />
                                 <Item value="CV" label="Cape Verde" />
                                 <Item value="KY" label="Cayman Islands" />
                                 <Item value="CF" label="Central African Republic" />
                                 <Item value="TD" label="Chad" />
                                 <Item value="CL" label="Chile" />
                                 <Item value="CN" label="China" />
                                 <Item value="CX" label="Christmas Island" />
                                 <Item value="CC" label="Cocos (Keeling) Islands" />
                                 <Item value="CO" label="Colombia" />
                                 <Item value="KM" label="Comoros" />
                                 <Item value="CG" label="Congo" />
                                 <Item value="CD" label="Congo, the Democratic Republic of the" />
                                 <Item value="CK" label="Cook Islands" />
                                 <Item value="CR" label="Costa Rica" />
                                 <Item value="CI" label="Côte d'Ivoire" />
                                 <Item value="HR" label="Croatia" />
                                 <Item value="CU" label="Cuba" />
                                 <Item value="CY" label="Cyprus" />
                                 <Item value="CZ" label="Czech Republic" />
                                 <Item value="DK" label="Denmark" />
                                 <Item value="DJ" label="Djibouti" />
                                 <Item value="DM" label="Dominica" />
                                 <Item value="DO" label="Dominican Republic" />
                                 <Item value="EC" label="Ecuador" />
                                 <Item value="EG" label="Egypt" />
                                 <Item value="SV" label="El Salvador" />
                                 <Item value="GQ" label="Equatorial Guinea" />
                                 <Item value="ER" label="Eritrea" />
                                 <Item value="EE" label="Estonia" />
                                 <Item value="ET" label="Ethiopia" />
                                 <Item value="EU" label="European Union" />
                                 <Item value="FK" label="Falkland Islands (Malvinas)" />
                                 <Item value="FO" label="Faroe Islands" />
                                 <Item value="FJ" label="Fiji" />
                                 <Item value="FI" label="Finland" />
                                 <Item value="FR" label="France" />
                                 <Item value="GF" label="French Guiana" />
                                 <Item value="PF" label="French Polynesia" />
                                 <Item value="TF" label="French Southern Territories" />
                                 <Item value="GA" label="Gabon" />
                                 <Item value="GM" label="Gambia" />
                                 <Item value="GE" label="Georgia" />
                                 <Item value="DE" label="Germany" />
                                 <Item value="GH" label="Ghana" />
                                 <Item value="GI" label="Gibraltar" />
                                 <Item value="GR" label="Greece" />
                                 <Item value="GL" label="Greenland" />
                                 <Item value="GD" label="Grenada" />
                                 <Item value="GP" label="Guadeloupe" />
                                 <Item value="GU" label="Guam" />
                                 <Item value="GT" label="Guatemala" />
                                 <Item value="GG" label="Guernsey" />
                                 <Item value="GN" label="Guinea" />
                                 <Item value="GW" label="Guinea-Bissau" />
                                 <Item value="GY" label="Guyana" />
                                 <Item value="HT" label="Haiti" />
                                 <Item value="HM" label="Heard Island and McDonald Islands" />
                                 <Item value="VA" label="Holy See (Vatican City State)" />
                                 <Item value="HN" label="Honduras" />
                                 <Item value="HK" label="Hong Kong" />
                                 <Item value="HU" label="Hungary" />
                                 <Item value="IS" label="Iceland" />
                                 <Item value="IN" label="India" />
                                 <Item value="ID" label="Indonesia" />
                                 <Item value="IR" label="Iran" />
                                 <Item value="IQ" label="Iraq" />
                                 <Item value="IE" label="Ireland" />
                                 <Item value="IM" label="Isle of Man" />
                                 <Item value="IL" label="Israel" />
                                 <Item value="IT" label="Italy" />
                                 <Item value="JM" label="Jamaica" />
                                 <Item value="JP" label="Japan" />
                                 <Item value="JE" label="Jersey" />
                                 <Item value="JO" label="Jordan" />
                                 <Item value="KZ" label="Kazakhstan" />
                                 <Item value="KE" label="Kenya" />
                                 <Item value="KI" label="Kiribati" />
                                 <Item value="KR" label="Korea" />
                                 <Item value="KP" label="Korea, Democratic People's Republic of" />
                                 <Item value="KW" label="Kuwait" />
                                 <Item value="KG" label="Kyrgyzstan" />
                                 <Item value="LA" label="Laos" />
                                 <Item value="LV" label="Latvia" />
                                 <Item value="LB" label="Lebanon" />
                                 <Item value="LS" label="Lesotho" />
                                 <Item value="LR" label="Liberia" />
                                 <Item value="LY" label="Libya" />
                                 <Item value="LI" label="Liechtenstein" />
                                 <Item value="LT" label="Lithuania" />
                                 <Item value="LU" label="Luxembourg" />
                                 <Item value="MO" label="Macao" />
                                 <Item value="MK" label="Macedonia" />
                                 <Item value="MG" label="Madagascar" />
                                 <Item value="MW" label="Malawi" />
                                 <Item value="MY" label="Malaysia" />
                                 <Item value="MV" label="Maldives" />
                                 <Item value="ML" label="Mali" />
                                 <Item value="MT" label="Malta" />
                                 <Item value="MH" label="Marshall Islands" />
                                 <Item value="MQ" label="Martinique" />
                                 <Item value="MR" label="Mauritania" />
                                 <Item value="MU" label="Mauritius" />
                                 <Item value="YT" label="Mayotte" />
                                 <Item value="MX" label="Mexico" />
                                 <Item value="FM" label="Micronesia" />
                                 <Item value="MD" label="Moldova" />
                                 <Item value="MC" label="Monaco" />
                                 <Item value="MN" label="Mongolia" />
                                 <Item value="ME" label="Montenegro" />
                                 <Item value="MS" label="Montserrat" />
                                 <Item value="MA" label="Morocco" />
                                 <Item value="MZ" label="Mozambique" />
                                 <Item value="MM" label="Myanmar" />
                                 <Item value="NA" label="Namibia" />
                                 <Item value="NR" label="Nauru" />
                                 <Item value="NP" label="Nepal" />
                                 <Item value="NL" label="Netherlands" />
                                 <Item value="AN" label="Netherlands Antilles" />
                                 <Item value="NC" label="New Caledonia" />
                                 <Item value="NZ" label="New Zealand" />
                                 <Item value="NI" label="Nicaragua" />
                                 <Item value="NE" label="Niger" />
                                 <Item value="NG" label="Nigeria" />
                                 <Item value="NU" label="Niue" />
                                 <Item value="NF" label="Norfolk Island" />
                                 <Item value="MP" label="Northern Mariana Islands" />
                                 <Item value="NO" label="Norway" />
                                 <Item value="OM" label="Oman" />
                                 <Item value="PK" label="Pakistan" />
                                 <Item value="PW" label="Palau" />
                                 <Item value="PS" label="Palestinian Territory" />
                                 <Item value="PA" label="Panama" />
                                 <Item value="PG" label="Papua New Guinea" />
                                 <Item value="PY" label="Paraguay" />
                                 <Item value="PE" label="Peru" />
                                 <Item value="PH" label="Philippines" />
                                 <Item value="PN" label="Pitcairn" />
                                 <Item value="PL" label="Poland" />
                                 <Item value="PT" label="Portugal" />
                                 <Item value="PR" label="Puerto Rico" />
                                 <Item value="QA" label="Qatar" />
                                 <Item value="RE" label="Réunion" />
                                 <Item value="RO" label="Romania" />
                                 <Item value="RU" label="Russian Federation" />
                                 <Item value="RW" label="Rwanda" />
                                 <Item value="BL" label="Saint Barthélemy" />
                                 <Item value="SH" label="Saint Helena" />
                                 <Item value="KN" label="Saint Kitts and Nevis" />
                                 <Item value="LC" label="Saint Lucia" />
                                 <Item value="MF" label="Saint Martin" />
                                 <Item value="PM" label="Saint Pierre and Miquelon" />
                                 <Item value="VC" label="Saint Vincent and the Grenadines" />
                                 <Item value="WS" label="Samoa" />
                                 <Item value="SM" label="San Marino" />
                                 <Item value="ST" label="Sao Tome and Principe" />
                                 <Item value="SA" label="Saudi Arabia" />
                                 <Item value="SN" label="Senegal" />
                                 <Item value="RS" label="Serbia" />
                                 <Item value="SC" label="Seychelles" />
                                 <Item value="SG" label="Singapore" />
                                 <Item value="SK" label="Slovakia" />
                                 <Item value="SI" label="Slovenia" />
                                 <Item value="SL" label="Slovenia" />
                                 <Item value="SB" label="Solomon Islands" />
                                 <Item value="SO" label="Somalia" />
                                 <Item value="ZA" label="South Africa" />
                                 <Item value="GS" label="South Georgia and the South Sandwich Islands" />
                                 <Item value="ES" label="Spain" />
                                 <Item value="LK" label="Sri Lanka" />
                                 <Item value="SD" label="Sudan" />
                                 <Item value="SR" label="Suriname" />
                                 <Item value="SJ" label="Svalbard and Jan Mayen" />
                                 <Item value="SZ" label="Swaziland" />
                                 <Item value="SE" label="Sweden" />
                                 <Item value="CH" label="Switzerland" />
                                 <Item value="SY" label="Syria" />
                                 <Item value="TW" label="Taiwan" />
                                 <Item value="TJ" label="Tajikistan" />
                                 <Item value="TZ" label="Tanzania" />
                                 <Item value="TH" label="Thailand" />
                                 <Item value="TL" label="Timor-Leste" />
                                 <Item value="TG" label="Togo" />
                                 <Item value="TK" label="Tokelau" />
                                 <Item value="TO" label="Tonga" />
                                 <Item value="TT" label="Trinidad and Tobago" />
                                 <Item value="TN" label="Tunisia" />
                                 <Item value="TR" label="Turkey" />
                                 <Item value="TM" label="Turkmenistan" />
                                 <Item value="TC" label="Turks and Caicos Islands" />
                                 <Item value="TV" label="Tuvalu" />
                                 <Item value="UG" label="Uganda" />
                                 <Item value="UA" label="Ukraine" />
                                 <Item value="AE" label="United Arab Emirates" />
                                 <Item value="GB" label="United Kingdom" />
                                 <Item value="US" label="United States" />
                                 <Item value="UM" label="United States Minor Outlying Islands" />
                                 <Item value="UY" label="Uruguay" />
                                 <Item value="UZ" label="Uzbekistan" />
                                 <Item value="VU" label="Vanuatu" />
                                 <Item value="VE" label="Venezuela" />
                                 <Item value="VN" label="Viet Nam" />
                                 <Item value="VG" label="Virgin Islands, British" />
                                 <Item value="VI" label="Virgin Islands, U.S." />
                                 <Item value="WF" label="Wallis and Futuna" />
                                 <Item value="EH" label="Western Sahara" />
                                 <Item value="YE" label="Yemen" />
                                 <Item value="ZM" label="Zambia" />
                                 <Item value="ZW" label="Zimbabwe" />
                          </Picker>
                        </View>
                    </View>
                    
                  </ListItem>

                  <ListItem>

                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginRight:10}}>
                          <Icon name="ios-flag" />
                        </View>
                        <View>
                          <Picker
                              iosHeader="Language"
                              mode="dropdown"
                              selectedValue={this.state.selectedLanguage}
                              onValueChange={this.languagePickerHandler.bind(this)}>
                              <Item label="Language" value="lang0" />
                              <Item value="th" label="???" />
                              <Item value="ar" label="Arabic - عربي" />
                              <Item value="bg" label="Bulgarian - Български" />
                              <Item value="cs" label="Cesky" />
                              <Item value="zh-CN" label="Chinese -  中文简体" />
                              <Item value="zh-TW" label="Chinese -  中文繁體" />
                              <Item value="da" label="Dansk" />
                              <Item value="de" label="Deutsch" />
                              <Item value="en" label="English" />
                              <Item value="es" label="Español" />
                              <Item value="fr" label="Français" />
                              <Item value="el" label="Greek - Ελληνικά" />
                              <Item value="he" label="Hebrew - עברית" />
                              <Item value="hr" label="Hrvatski" />
                              <Item value="it" label="Italiano" />
                              <Item value="ja" label="Japanese - 日本語" />
                              <Item value="hu" label="Magyar" />
                              <Item value="nl" label="Nederlands" />
                              <Item value="no" label="Norsk" />
                              <Item value="pl" label="Polski" />
                              <Item value="pt" label="Português" />
                              <Item value="pt-BR" label="Português - Brasil" />
                              <Item value="ro" label="Română" />
                              <Item value="ru" label="Russian - Русский" />
                              <Item value="sk" label="Slovak" />
                              <Item value="sl" label="Slovenian" />
                              <Item value="fi" label="Suomi" />
                              <Item value="sv" label="Svenska" />
                              <Item value="tr" label="Türkçe" />
                          </Picker>
                        </View>
                    </View>
                    
                  </ListItem>

              </List>

              <Button bordered block style={{margin:10}} onPress={() => this.sendForm()}> Send </Button>

              </Content>
          </View>
        
          <BottomMenu current="demo" ref="footer" />
        </View>

     </Container>
    );
  }
}