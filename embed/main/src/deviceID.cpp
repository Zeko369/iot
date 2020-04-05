#include "deviceID.h"
#include "arduino.h"

#define NUMBER_OF_PINS 3
const int pins[NUMBER_OF_PINS] = {27, 14, 12};

void setupDeviceId() {
  for(int i = 0; i < NUMBER_OF_PINS; i++) {
    pinMode(pins[i], INPUT_PULLUP);
  }
}

int getDeviceId() {
  int out = 0b000;

  for(int i = NUMBER_OF_PINS - 1; i >= 0; i--) {
    bitWrite(out, i, !digitalRead(pins[i]));
  }

  return out;
}
