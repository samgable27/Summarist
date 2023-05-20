/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 *
 *
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.updateRoleOnSubscriptionChange = functions.firestore
  .document("users/{userId}/subscriptions/{subscriptionId}")
  .onWrite(
    async (
      change: functions.Change<admin.firestore.DocumentSnapshot>,
      context: functions.EventContext
    ) => {
      const newSubscriptionData = change?.after?.data();
      const userId = context?.params?.userId;

      // You may need to adjust this line based on your subscription data structure
      const newStripeRole =
        newSubscriptionData?.items[0]?.price?.product?.metadata?.stripeRole;

      // Set custom user claims on this user.
      await admin
        .auth()
        .setCustomUserClaims(userId, { stripeRole: newStripeRole });
    }
  );
