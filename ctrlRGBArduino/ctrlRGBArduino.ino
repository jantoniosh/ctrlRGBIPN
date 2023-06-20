#include <TimerOne.h>
#include <ArduinoJson.h>

int rPin = A0;
int rValue = 0;
int gPin = A1;
int gValue = 0;
int bPin = A2;
int bValue = 0;

StaticJsonDocument<200> rgb;

void rgbPots() {
  rValue = analogRead(rPin);
  gValue = analogRead(gPin);
  bValue = analogRead(bPin);

  rgb["r"] = rValue * (5.0 / 1023.0);
  rgb["g"] = gValue * (5.0 / 1023.0);
  rgb["b"] = bValue * (5.0 / 1023.0);
  
  serializeJson(rgb, Serial);
  Serial.println();

}

void setup() {
  // Initialize Serial port
  Serial.begin(9600);
  while (!Serial) continue;
  
  Timer1.initialize(1000000);
  Timer1.attachInterrupt(rgbPots);
}

void loop() {
}
