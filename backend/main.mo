import Func "mo:base/Func";
import Text "mo:base/Text";

import Float "mo:base/Float";

actor Calculator {
  // Function to perform arithmetic operations
  public func calculate(operation: Text, num1: Float, num2: Float) : async Float {
    switch (operation) {
      case ("+") { return num1 + num2; };
      case ("-") { return num1 - num2; };
      case ("*") { return num1 * num2; };
      case ("/") {
        if (num2 == 0) {
          return 0/0; // Return NaN for division by zero
        } else {
          return num1 / num2;
        };
      };
      case (_) { return 0/0; }; // Return NaN for unknown operations
    };
  };
}