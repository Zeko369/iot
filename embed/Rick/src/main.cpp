#include <Arduino.h>
#include <FastLED.h>
#include <analogWrite.h>

#define NUM_LEDS 2
#define DATA_PIN 32

// Todo switch to DAC_1/2 for better resolution
// Add a mosfet??
#define HEAD_LED 33
#define FULL_CYCLE 3000

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);  // GRB ordering is assumed
  FastLED.setBrightness(128);

  analogWriteResolution(HEAD_LED, 12);
}

void setLeds(CRGB color) {
  for(int j = 0; j < NUM_LEDS; j++) {
    leds[j] = color;
  }
}

void runLeds(int i) {
  setLeds(CHSV(i, 255, 255));
  FastLED.show();
  delay(FULL_CYCLE / 256);
}

void loop() {
  for(int i = 0; i < 255; i++) {
    leds[0] = CRGB(0, i, 0);
    leds[1] = CRGB(i, 0, 0);

    FastLED.show();

    delay(5);
  }

  for(int i = 255; i >= 0; i--) {
    leds[0] = CRGB(0, i, 0);
    leds[1] = CRGB(i, 0, 0);

    FastLED.show();

    delay(5);
  }
  // for(int i = 0; i < 256; i++) {
  //   analogWrite(HEAD_LED, i);
  //   runLeds(i);
  // }
  //
  // for(int i = 255; i >= 0; i--) {
  //   analogWrite(HEAD_LED, i);
  //   runLeds(i);
  // }
}
