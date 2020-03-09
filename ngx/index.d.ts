import {IonicNativePlugin} from '@ionic-native/core';
/**
 * Options for the setupApplePay method.
 */
import * as ɵngcc0 from '@angular/core';

export interface ApplePayOptions {
  /**
   * Apple Merchant ID - can be obtained from the Apple Developer Portal.
   */
  merchantId: string;
  /**
   * The currency in which to receive payment.
   * This is a 3 letter currency code (ISO-4217) - e.g. "GBP", "USD", "MXN", etc.
   */
  currency: string;
  /**
   * The locale in which payment is accepted.
   * This is a 2 letter country code (ISO-3166-1) - e.g. "GB", "US", "MX"
   */
  country: string;
}

/**
 * Options for the presentDropInPaymentUI method.
 */
export interface PaymentUIOptions {
  /**
   * The amount of the transaction to show in the drop-in UI on the
   * summary row as well as the call-to-action button, as a string.
   * If not provided, this value will default to "0.00", e.g. free.
   * Unless you are simply capturing authorizations, you probably
   * want to fill this value in!
   */
  amount?: string;
  /**
   * The description of the transaction to show in the drop-in UI on the summary row.
   * Defaults to empty string.
   */
  primaryDescription?: string;

  threeDSecure: {
    amount: string,
    email: string
  };
}

/**
 * Successful callback result for the presentDropInPaymentUI method.
 */
export interface PaymentUIResult {
  /**
   * Indicates if the user used the cancel button to close the dialog without
   * completing the payment.
   */
  userCancelled: boolean;
  /**
   * The nonce returned for the payment transaction (if a payment was completed).
   */
  nonce: string;
  /**
   * The payment type (if a payment was completed) (credit card, check, paypal, etc).
   */
  type: string;
  /**
   * A description of the payment method (if a payment was completed).
   */
  localizedDescription: string;
  /**
   * Information about the credit card used to complete a payment (if a credit card was used).
   */
  card: {
    /**
     * The last two digits of the credit card used.
     */
    lastTwo: string;
    /**
     * An enumerated value used to indicate the type of credit card used.
     *
     * Can be one of the following values:
     *
     * BTCardNetworkUnknown
     * BTCardNetworkAMEX
     * BTCardNetworkDinersClub
     * BTCardNetworkDiscover
     * BTCardNetworkMasterCard
     * BTCardNetworkVisa
     * BTCardNetworkJCB
     * BTCardNetworkLaser
     * BTCardNetworkMaestro
     * BTCardNetworkUnionPay
     * BTCardNetworkSolo
     * BTCardNetworkSwitch
     * BTCardNetworkUKMaestro
     */
    network: string;
  };
  /**
   * Information about the PayPal account used to complete a payment (if a PayPal account was used).
   */
  payPalAccount: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    billingAddress: string;
    shippingAddress: string;
    clientMetadataId: string;
    payerId: string;
  };
  /**
   * Information about the Apple Pay card used to complete a payment (if Apple Pay was used).
   */
  applePaycard: {};
  /**
   * Information about 3D Secure card used to complete a payment (if 3D Secure was used).
   */
  threeDSecureInfo: {
    liabilityShifted: boolean;
    liabilityShiftPossible: boolean;
  };

  deviceData: string,
  /**
   * Information about Venmo account used to complete a payment (if a Venmo account was used).
   */
  venmoAccount: {
    username: string;
  };
}

/**
 * @name Braintree
 * @description
 * This plugin enables the use of the Braintree Drop-In Payments UI in your Ionic applications on Android and iOS, using the native Drop-In UI for each platform (not the Javascript SDK).
 *
 *  Ionic Native utilizes [a maintained fork](https://github.com/taracque/cordova-plugin-braintree) of the original `cordova-plugin-braintree`
 *
 *  For information on how to use Apple Pay with this plugin, please refer to the [plugin documentation](https://github.com/Taracque/cordova-plugin-braintree#apple-pay-ios-only)
 *
 * **NOTE**: This is not a complete payments solution. All of the Braintree client-side UIs simply generate a payment nonce that must then be processed by your server to complete the payment.
 * See the [Braintree Node server documentation](https://developers.braintreepayments.com/start/hello-server/node) for details and a [sample Express server](https://github.com/braintree/braintree_express_example) that implements the required functionality.
 *
 * @usage
 * ```typescript
 * import { Braintree, ApplePayOptions, PaymentUIOptions } from '@ionic-native/braintree/ngx';
 *
 * constructor(private braintree: Braintree) { }
 *
 * ...
 *
 * // Your Braintree `Tokenization Key` from the Braintree dashboard.
 * // Alternatively you can also generate this token server-side
 * // using a client ID in order to allow users to use stored payment methods.
 * // See the [Braintree Client Token documentation](https://developers.braintreepayments.com/reference/request/client-token/generate/node#customer_id) for details.
 * const BRAINTREE_TOKEN = '<YOUR_BRAINTREE_TOKEN>';
 *
 * // NOTE: Do not provide this unless you have configured your Apple Developer account
 * // as well as your Braintree merchant account, otherwise the Braintree module will fail.
 * const appleOptions: ApplePayOptions = {
 *   merchantId: '<YOUR MERCHANT ID>',
 *   currency: 'USD',
 *   country: 'US'
 * }
 *
 * const paymentOptions: PaymentUIOptions = {
 *   amount: '14.99',
 *   primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
 * }
 *
 * this.braintree.initialize(BRAINTREE_TOKEN)
 *   .then(() => this.braintree.setupApplePay(appleOptions))
 *   .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
 *   .then((result: PaymentUIResult) => {
 *     if (result.userCancelled) {
 *       console.log("User cancelled payment dialog.");
 *     } else {
 *       console.log("User successfully completed payment!");
 *       console.log("Payment Nonce: " + result.nonce);
 *       console.log("Payment Result.", result);
 *     }
 *   })
 *   .catch((error: string) => console.error(error));
 *
 * ```
 *
 * @interfaces
 * ApplePayOptions
 * PaymentUIOptions
 * PaymentUIResult
 */
export declare class Braintree extends IonicNativePlugin {
  /**
   * Used to initialize the Braintree client. This function must be called before other methods can be used.
   *  As the initialize code is async, be sure you call all Braintree related methods after the initialize promise has resolved.
   *
   * @param {string} token The client token or tokenization key to use with the Braintree client.
   * @return {Promise<undefined | string>} Returns a promise that resolves with undefined on successful initialization, or rejects with a string message describing the failure.
   */
  initialize(token: string): Promise<undefined | string>;

  /**
   * Used to configure Apple Pay on iOS.
   *  In order for Apple Pay payments to appear on the Drop-In Payments UI, you must initialize the Apple Pay framework before using the Drop-In Payments UI.
   *
   *  Do not turn on Apple Pay in Braintree if you don't have Apple Pay entitlements - the Braintree module will reject the attempt to set up Apple Pay.
   *  Please refer to the [Braintree Merchant Documentation](https://developers.braintreepayments.com/guides/apple-pay/configuration/ios/v4#apple-pay-certificate-request-and-provisioning) to set up a Merchant Account.
   *
   *  Calling this function on Android is a `noop` so you can call it without having to check which cordova platform you are on! :D
   *
   * @param {ApplePayOptions}options The options used to configure Apple Pay.
   * @return {Promise<undefined | string>} Returns a promise that resolves with undefined on successful initialization, or rejects with a string message describing the failure.
   */
  setupApplePay(options: ApplePayOptions): Promise<undefined | string>;

  /**
   * Shows Braintree's Drop-In Payments UI.
   *  Apple Pay is only shown in the Drop In UI if you have previously called `setupApplePay`.
   *
   * @param options {PaymentUIOptions} An optional argument used to configure the payment UI; see type definition for parameters. If not provided, the UI will show "0.00" as the price and an empty description.
   * @return {Promise<PaymentUIResult | string>} Returns a promise that resolves with a PaymentUIResult object on successful payment (or the user cancels), or rejects with a string message describing the failure.
   */
  presentDropInPaymentUI(options?: PaymentUIOptions): Promise<PaymentUIResult | string>;

  static ɵfac: ɵngcc0.ɵɵFactoryDef<Braintree>;
  static ɵprov: ɵngcc0.ɵɵInjectableDef<Braintree>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZC50cyIsInNvdXJjZXMiOlsiaW5kZXguZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNk1BIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW9uaWNOYXRpdmVQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuLyoqXG4gKiBPcHRpb25zIGZvciB0aGUgc2V0dXBBcHBsZVBheSBtZXRob2QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGVQYXlPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBBcHBsZSBNZXJjaGFudCBJRCAtIGNhbiBiZSBvYnRhaW5lZCBmcm9tIHRoZSBBcHBsZSBEZXZlbG9wZXIgUG9ydGFsLlxuICAgICAqL1xuICAgIG1lcmNoYW50SWQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVuY3kgaW4gd2hpY2ggdG8gcmVjZWl2ZSBwYXltZW50LlxuICAgICAqIFRoaXMgaXMgYSAzIGxldHRlciBjdXJyZW5jeSBjb2RlIChJU08tNDIxNykgLSBlLmcuIFwiR0JQXCIsIFwiVVNEXCIsIFwiTVhOXCIsIGV0Yy5cbiAgICAgKi9cbiAgICBjdXJyZW5jeTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBsb2NhbGUgaW4gd2hpY2ggcGF5bWVudCBpcyBhY2NlcHRlZC5cbiAgICAgKiBUaGlzIGlzIGEgMiBsZXR0ZXIgY291bnRyeSBjb2RlIChJU08tMzE2Ni0xKSAtIGUuZy4gXCJHQlwiLCBcIlVTXCIsIFwiTVhcIlxuICAgICAqL1xuICAgIGNvdW50cnk6IHN0cmluZztcbn1cbi8qKlxuICogT3B0aW9ucyBmb3IgdGhlIHByZXNlbnREcm9wSW5QYXltZW50VUkgbWV0aG9kLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRVSU9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIFRoZSBhbW91bnQgb2YgdGhlIHRyYW5zYWN0aW9uIHRvIHNob3cgaW4gdGhlIGRyb3AtaW4gVUkgb24gdGhlXG4gICAgICogc3VtbWFyeSByb3cgYXMgd2VsbCBhcyB0aGUgY2FsbC10by1hY3Rpb24gYnV0dG9uLCBhcyBhIHN0cmluZy5cbiAgICAgKiBJZiBub3QgcHJvdmlkZWQsIHRoaXMgdmFsdWUgd2lsbCBkZWZhdWx0IHRvIFwiMC4wMFwiLCBlLmcuIGZyZWUuXG4gICAgICogVW5sZXNzIHlvdSBhcmUgc2ltcGx5IGNhcHR1cmluZyBhdXRob3JpemF0aW9ucywgeW91IHByb2JhYmx5XG4gICAgICogd2FudCB0byBmaWxsIHRoaXMgdmFsdWUgaW4hXG4gICAgICovXG4gICAgYW1vdW50Pzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgdHJhbnNhY3Rpb24gdG8gc2hvdyBpbiB0aGUgZHJvcC1pbiBVSSBvbiB0aGUgc3VtbWFyeSByb3cuXG4gICAgICogRGVmYXVsdHMgdG8gZW1wdHkgc3RyaW5nLlxuICAgICAqL1xuICAgIHByaW1hcnlEZXNjcmlwdGlvbj86IHN0cmluZztcbn1cbi8qKlxuICogU3VjY2Vzc2Z1bCBjYWxsYmFjayByZXN1bHQgZm9yIHRoZSBwcmVzZW50RHJvcEluUGF5bWVudFVJIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYXltZW50VUlSZXN1bHQge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiB0aGUgdXNlciB1c2VkIHRoZSBjYW5jZWwgYnV0dG9uIHRvIGNsb3NlIHRoZSBkaWFsb2cgd2l0aG91dFxuICAgICAqIGNvbXBsZXRpbmcgdGhlIHBheW1lbnQuXG4gICAgICovXG4gICAgdXNlckNhbmNlbGxlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgbm9uY2UgcmV0dXJuZWQgZm9yIHRoZSBwYXltZW50IHRyYW5zYWN0aW9uIChpZiBhIHBheW1lbnQgd2FzIGNvbXBsZXRlZCkuXG4gICAgICovXG4gICAgbm9uY2U6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgcGF5bWVudCB0eXBlIChpZiBhIHBheW1lbnQgd2FzIGNvbXBsZXRlZCkgKGNyZWRpdCBjYXJkLCBjaGVjaywgcGF5cGFsLCBldGMpLlxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBIGRlc2NyaXB0aW9uIG9mIHRoZSBwYXltZW50IG1ldGhvZCAoaWYgYSBwYXltZW50IHdhcyBjb21wbGV0ZWQpLlxuICAgICAqL1xuICAgIGxvY2FsaXplZERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIGNyZWRpdCBjYXJkIHVzZWQgdG8gY29tcGxldGUgYSBwYXltZW50IChpZiBhIGNyZWRpdCBjYXJkIHdhcyB1c2VkKS5cbiAgICAgKi9cbiAgICBjYXJkOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGFzdCB0d28gZGlnaXRzIG9mIHRoZSBjcmVkaXQgY2FyZCB1c2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgbGFzdFR3bzogc3RyaW5nO1xuICAgICAgICAvKipcbiAgICAgICAgICogQW4gZW51bWVyYXRlZCB2YWx1ZSB1c2VkIHRvIGluZGljYXRlIHRoZSB0eXBlIG9mIGNyZWRpdCBjYXJkIHVzZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIENhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZXM6XG4gICAgICAgICAqXG4gICAgICAgICAqIEJUQ2FyZE5ldHdvcmtVbmtub3duXG4gICAgICAgICAqIEJUQ2FyZE5ldHdvcmtBTUVYXG4gICAgICAgICAqIEJUQ2FyZE5ldHdvcmtEaW5lcnNDbHViXG4gICAgICAgICAqIEJUQ2FyZE5ldHdvcmtEaXNjb3ZlclxuICAgICAgICAgKiBCVENhcmROZXR3b3JrTWFzdGVyQ2FyZFxuICAgICAgICAgKiBCVENhcmROZXR3b3JrVmlzYVxuICAgICAgICAgKiBCVENhcmROZXR3b3JrSkNCXG4gICAgICAgICAqIEJUQ2FyZE5ldHdvcmtMYXNlclxuICAgICAgICAgKiBCVENhcmROZXR3b3JrTWFlc3Ryb1xuICAgICAgICAgKiBCVENhcmROZXR3b3JrVW5pb25QYXlcbiAgICAgICAgICogQlRDYXJkTmV0d29ya1NvbG9cbiAgICAgICAgICogQlRDYXJkTmV0d29ya1N3aXRjaFxuICAgICAgICAgKiBCVENhcmROZXR3b3JrVUtNYWVzdHJvXG4gICAgICAgICAqL1xuICAgICAgICBuZXR3b3JrOiBzdHJpbmc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgUGF5UGFsIGFjY291bnQgdXNlZCB0byBjb21wbGV0ZSBhIHBheW1lbnQgKGlmIGEgUGF5UGFsIGFjY291bnQgd2FzIHVzZWQpLlxuICAgICAqL1xuICAgIHBheVBhbEFjY291bnQ6IHtcbiAgICAgICAgZW1haWw6IHN0cmluZztcbiAgICAgICAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gICAgICAgIGxhc3ROYW1lOiBzdHJpbmc7XG4gICAgICAgIHBob25lOiBzdHJpbmc7XG4gICAgICAgIGJpbGxpbmdBZGRyZXNzOiBzdHJpbmc7XG4gICAgICAgIHNoaXBwaW5nQWRkcmVzczogc3RyaW5nO1xuICAgICAgICBjbGllbnRNZXRhZGF0YUlkOiBzdHJpbmc7XG4gICAgICAgIHBheWVySWQ6IHN0cmluZztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBBcHBsZSBQYXkgY2FyZCB1c2VkIHRvIGNvbXBsZXRlIGEgcGF5bWVudCAoaWYgQXBwbGUgUGF5IHdhcyB1c2VkKS5cbiAgICAgKi9cbiAgICBhcHBsZVBheWNhcmQ6IHt9O1xuICAgIC8qKlxuICAgICAqIEluZm9ybWF0aW9uIGFib3V0IDNEIFNlY3VyZSBjYXJkIHVzZWQgdG8gY29tcGxldGUgYSBwYXltZW50IChpZiAzRCBTZWN1cmUgd2FzIHVzZWQpLlxuICAgICAqL1xuICAgIHRocmVlRFNlY3VyZUNhcmQ6IHtcbiAgICAgICAgbGlhYmlsaXR5U2hpZnRlZDogYm9vbGVhbjtcbiAgICAgICAgbGlhYmlsaXR5U2hpZnRQb3NzaWJsZTogYm9vbGVhbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluZm9ybWF0aW9uIGFib3V0IFZlbm1vIGFjY291bnQgdXNlZCB0byBjb21wbGV0ZSBhIHBheW1lbnQgKGlmIGEgVmVubW8gYWNjb3VudCB3YXMgdXNlZCkuXG4gICAgICovXG4gICAgdmVubW9BY2NvdW50OiB7XG4gICAgICAgIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgfTtcbn1cbi8qKlxuICogQG5hbWUgQnJhaW50cmVlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgcGx1Z2luIGVuYWJsZXMgdGhlIHVzZSBvZiB0aGUgQnJhaW50cmVlIERyb3AtSW4gUGF5bWVudHMgVUkgaW4geW91ciBJb25pYyBhcHBsaWNhdGlvbnMgb24gQW5kcm9pZCBhbmQgaU9TLCB1c2luZyB0aGUgbmF0aXZlIERyb3AtSW4gVUkgZm9yIGVhY2ggcGxhdGZvcm0gKG5vdCB0aGUgSmF2YXNjcmlwdCBTREspLlxuICpcbiAqICBJb25pYyBOYXRpdmUgdXRpbGl6ZXMgW2EgbWFpbnRhaW5lZCBmb3JrXShodHRwczovL2dpdGh1Yi5jb20vdGFyYWNxdWUvY29yZG92YS1wbHVnaW4tYnJhaW50cmVlKSBvZiB0aGUgb3JpZ2luYWwgYGNvcmRvdmEtcGx1Z2luLWJyYWludHJlZWBcbiAqXG4gKiAgRm9yIGluZm9ybWF0aW9uIG9uIGhvdyB0byB1c2UgQXBwbGUgUGF5IHdpdGggdGhpcyBwbHVnaW4sIHBsZWFzZSByZWZlciB0byB0aGUgW3BsdWdpbiBkb2N1bWVudGF0aW9uXShodHRwczovL2dpdGh1Yi5jb20vVGFyYWNxdWUvY29yZG92YS1wbHVnaW4tYnJhaW50cmVlI2FwcGxlLXBheS1pb3Mtb25seSlcbiAqXG4gKiAqKk5PVEUqKjogVGhpcyBpcyBub3QgYSBjb21wbGV0ZSBwYXltZW50cyBzb2x1dGlvbi4gQWxsIG9mIHRoZSBCcmFpbnRyZWUgY2xpZW50LXNpZGUgVUlzIHNpbXBseSBnZW5lcmF0ZSBhIHBheW1lbnQgbm9uY2UgdGhhdCBtdXN0IHRoZW4gYmUgcHJvY2Vzc2VkIGJ5IHlvdXIgc2VydmVyIHRvIGNvbXBsZXRlIHRoZSBwYXltZW50LlxuICogU2VlIHRoZSBbQnJhaW50cmVlIE5vZGUgc2VydmVyIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZGV2ZWxvcGVycy5icmFpbnRyZWVwYXltZW50cy5jb20vc3RhcnQvaGVsbG8tc2VydmVyL25vZGUpIGZvciBkZXRhaWxzIGFuZCBhIFtzYW1wbGUgRXhwcmVzcyBzZXJ2ZXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFpbnRyZWUvYnJhaW50cmVlX2V4cHJlc3NfZXhhbXBsZSkgdGhhdCBpbXBsZW1lbnRzIHRoZSByZXF1aXJlZCBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQnJhaW50cmVlLCBBcHBsZVBheU9wdGlvbnMsIFBheW1lbnRVSU9wdGlvbnMgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2JyYWludHJlZS9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJhaW50cmVlOiBCcmFpbnRyZWUpIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqIC8vIFlvdXIgQnJhaW50cmVlIGBUb2tlbml6YXRpb24gS2V5YCBmcm9tIHRoZSBCcmFpbnRyZWUgZGFzaGJvYXJkLlxuICogLy8gQWx0ZXJuYXRpdmVseSB5b3UgY2FuIGFsc28gZ2VuZXJhdGUgdGhpcyB0b2tlbiBzZXJ2ZXItc2lkZVxuICogLy8gdXNpbmcgYSBjbGllbnQgSUQgaW4gb3JkZXIgdG8gYWxsb3cgdXNlcnMgdG8gdXNlIHN0b3JlZCBwYXltZW50IG1ldGhvZHMuXG4gKiAvLyBTZWUgdGhlIFtCcmFpbnRyZWUgQ2xpZW50IFRva2VuIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZGV2ZWxvcGVycy5icmFpbnRyZWVwYXltZW50cy5jb20vcmVmZXJlbmNlL3JlcXVlc3QvY2xpZW50LXRva2VuL2dlbmVyYXRlL25vZGUjY3VzdG9tZXJfaWQpIGZvciBkZXRhaWxzLlxuICogY29uc3QgQlJBSU5UUkVFX1RPS0VOID0gJzxZT1VSX0JSQUlOVFJFRV9UT0tFTj4nO1xuICpcbiAqIC8vIE5PVEU6IERvIG5vdCBwcm92aWRlIHRoaXMgdW5sZXNzIHlvdSBoYXZlIGNvbmZpZ3VyZWQgeW91ciBBcHBsZSBEZXZlbG9wZXIgYWNjb3VudFxuICogLy8gYXMgd2VsbCBhcyB5b3VyIEJyYWludHJlZSBtZXJjaGFudCBhY2NvdW50LCBvdGhlcndpc2UgdGhlIEJyYWludHJlZSBtb2R1bGUgd2lsbCBmYWlsLlxuICogY29uc3QgYXBwbGVPcHRpb25zOiBBcHBsZVBheU9wdGlvbnMgPSB7XG4gKiAgIG1lcmNoYW50SWQ6ICc8WU9VUiBNRVJDSEFOVCBJRD4nLFxuICogICBjdXJyZW5jeTogJ1VTRCcsXG4gKiAgIGNvdW50cnk6ICdVUydcbiAqIH1cbiAqXG4gKiBjb25zdCBwYXltZW50T3B0aW9uczogUGF5bWVudFVJT3B0aW9ucyA9IHtcbiAqICAgYW1vdW50OiAnMTQuOTknLFxuICogICBwcmltYXJ5RGVzY3JpcHRpb246ICdZb3VyIHByb2R1Y3Qgb3Igc2VydmljZSAocGVyIC9pdGVtLCAvbW9udGgsIC93ZWVrLCBldGMpJyxcbiAqIH1cbiAqXG4gKiB0aGlzLmJyYWludHJlZS5pbml0aWFsaXplKEJSQUlOVFJFRV9UT0tFTilcbiAqICAgLnRoZW4oKCkgPT4gdGhpcy5icmFpbnRyZWUuc2V0dXBBcHBsZVBheShhcHBsZU9wdGlvbnMpKVxuICogICAudGhlbigoKSA9PiB0aGlzLmJyYWludHJlZS5wcmVzZW50RHJvcEluUGF5bWVudFVJKHBheW1lbnRPcHRpb25zKSlcbiAqICAgLnRoZW4oKHJlc3VsdDogUGF5bWVudFVJUmVzdWx0KSA9PiB7XG4gKiAgICAgaWYgKHJlc3VsdC51c2VyQ2FuY2VsbGVkKSB7XG4gKiAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgY2FuY2VsbGVkIHBheW1lbnQgZGlhbG9nLlwiKTtcbiAqICAgICB9IGVsc2Uge1xuICogICAgICAgY29uc29sZS5sb2coXCJVc2VyIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWQgcGF5bWVudCFcIik7XG4gKiAgICAgICBjb25zb2xlLmxvZyhcIlBheW1lbnQgTm9uY2U6IFwiICsgcmVzdWx0Lm5vbmNlKTtcbiAqICAgICAgIGNvbnNvbGUubG9nKFwiUGF5bWVudCBSZXN1bHQuXCIsIHJlc3VsdCk7XG4gKiAgICAgfVxuICogICB9KVxuICogICAuY2F0Y2goKGVycm9yOiBzdHJpbmcpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAqXG4gKiBgYGBcbiAqXG4gKiBAaW50ZXJmYWNlc1xuICogQXBwbGVQYXlPcHRpb25zXG4gKiBQYXltZW50VUlPcHRpb25zXG4gKiBQYXltZW50VUlSZXN1bHRcbiAqL1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQnJhaW50cmVlIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaW5pdGlhbGl6ZSB0aGUgQnJhaW50cmVlIGNsaWVudC4gVGhpcyBmdW5jdGlvbiBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgb3RoZXIgbWV0aG9kcyBjYW4gYmUgdXNlZC5cbiAgICAgKiAgQXMgdGhlIGluaXRpYWxpemUgY29kZSBpcyBhc3luYywgYmUgc3VyZSB5b3UgY2FsbCBhbGwgQnJhaW50cmVlIHJlbGF0ZWQgbWV0aG9kcyBhZnRlciB0aGUgaW5pdGlhbGl6ZSBwcm9taXNlIGhhcyByZXNvbHZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b2tlbiBUaGUgY2xpZW50IHRva2VuIG9yIHRva2VuaXphdGlvbiBrZXkgdG8gdXNlIHdpdGggdGhlIEJyYWludHJlZSBjbGllbnQuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTx1bmRlZmluZWQgfCBzdHJpbmc+fSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdW5kZWZpbmVkIG9uIHN1Y2Nlc3NmdWwgaW5pdGlhbGl6YXRpb24sIG9yIHJlamVjdHMgd2l0aCBhIHN0cmluZyBtZXNzYWdlIGRlc2NyaWJpbmcgdGhlIGZhaWx1cmUuXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx1bmRlZmluZWQgfCBzdHJpbmc+O1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY29uZmlndXJlIEFwcGxlIFBheSBvbiBpT1MuXG4gICAgICogIEluIG9yZGVyIGZvciBBcHBsZSBQYXkgcGF5bWVudHMgdG8gYXBwZWFyIG9uIHRoZSBEcm9wLUluIFBheW1lbnRzIFVJLCB5b3UgbXVzdCBpbml0aWFsaXplIHRoZSBBcHBsZSBQYXkgZnJhbWV3b3JrIGJlZm9yZSB1c2luZyB0aGUgRHJvcC1JbiBQYXltZW50cyBVSS5cbiAgICAgKlxuICAgICAqICBEbyBub3QgdHVybiBvbiBBcHBsZSBQYXkgaW4gQnJhaW50cmVlIGlmIHlvdSBkb24ndCBoYXZlIEFwcGxlIFBheSBlbnRpdGxlbWVudHMgLSB0aGUgQnJhaW50cmVlIG1vZHVsZSB3aWxsIHJlamVjdCB0aGUgYXR0ZW1wdCB0byBzZXQgdXAgQXBwbGUgUGF5LlxuICAgICAqICBQbGVhc2UgcmVmZXIgdG8gdGhlIFtCcmFpbnRyZWUgTWVyY2hhbnQgRG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly9kZXZlbG9wZXJzLmJyYWludHJlZXBheW1lbnRzLmNvbS9ndWlkZXMvYXBwbGUtcGF5L2NvbmZpZ3VyYXRpb24vaW9zL3Y0I2FwcGxlLXBheS1jZXJ0aWZpY2F0ZS1yZXF1ZXN0LWFuZC1wcm92aXNpb25pbmcpIHRvIHNldCB1cCBhIE1lcmNoYW50IEFjY291bnQuXG4gICAgICpcbiAgICAgKiAgQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIG9uIEFuZHJvaWQgaXMgYSBgbm9vcGAgc28geW91IGNhbiBjYWxsIGl0IHdpdGhvdXQgaGF2aW5nIHRvIGNoZWNrIHdoaWNoIGNvcmRvdmEgcGxhdGZvcm0geW91IGFyZSBvbiEgOkRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXBwbGVQYXlPcHRpb25zfW9wdGlvbnMgVGhlIG9wdGlvbnMgdXNlZCB0byBjb25maWd1cmUgQXBwbGUgUGF5LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8dW5kZWZpbmVkIHwgc3RyaW5nPn0gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHVuZGVmaW5lZCBvbiBzdWNjZXNzZnVsIGluaXRpYWxpemF0aW9uLCBvciByZWplY3RzIHdpdGggYSBzdHJpbmcgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBmYWlsdXJlLlxuICAgICAqL1xuICAgIHNldHVwQXBwbGVQYXkob3B0aW9uczogQXBwbGVQYXlPcHRpb25zKTogUHJvbWlzZTx1bmRlZmluZWQgfCBzdHJpbmc+O1xuICAgIC8qKlxuICAgICAqIFNob3dzIEJyYWludHJlZSdzIERyb3AtSW4gUGF5bWVudHMgVUkuXG4gICAgICogIEFwcGxlIFBheSBpcyBvbmx5IHNob3duIGluIHRoZSBEcm9wIEluIFVJIGlmIHlvdSBoYXZlIHByZXZpb3VzbHkgY2FsbGVkIGBzZXR1cEFwcGxlUGF5YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtQYXltZW50VUlPcHRpb25zfSBBbiBvcHRpb25hbCBhcmd1bWVudCB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgcGF5bWVudCBVSTsgc2VlIHR5cGUgZGVmaW5pdGlvbiBmb3IgcGFyYW1ldGVycy4gSWYgbm90IHByb3ZpZGVkLCB0aGUgVUkgd2lsbCBzaG93IFwiMC4wMFwiIGFzIHRoZSBwcmljZSBhbmQgYW4gZW1wdHkgZGVzY3JpcHRpb24uXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxQYXltZW50VUlSZXN1bHQgfCBzdHJpbmc+fSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBQYXltZW50VUlSZXN1bHQgb2JqZWN0IG9uIHN1Y2Nlc3NmdWwgcGF5bWVudCAob3IgdGhlIHVzZXIgY2FuY2VscyksIG9yIHJlamVjdHMgd2l0aCBhIHN0cmluZyBtZXNzYWdlIGRlc2NyaWJpbmcgdGhlIGZhaWx1cmUuXG4gICAgICovXG4gICAgcHJlc2VudERyb3BJblBheW1lbnRVSShvcHRpb25zPzogUGF5bWVudFVJT3B0aW9ucyk6IFByb21pc2U8UGF5bWVudFVJUmVzdWx0IHwgc3RyaW5nPjtcbn1cbiJdfQ==
