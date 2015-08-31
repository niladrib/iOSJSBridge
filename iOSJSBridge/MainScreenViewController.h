//
//  ViewController.h
//  iOSJSBridge
//
//  Created by Niladri Bora on 8/28/15.
//  Copyright © 2015 LUMO Bodytech. All rights reserved.
//

#import <UIKit/UIKit.h>

extern NSString* const sampleSize;

@interface MainScreenViewController : UIViewController

@property (weak, nonatomic) IBOutlet UILabel *currentCadence;
@property (weak, nonatomic) IBOutlet UILabel *currentLurch;
@property (weak, nonatomic) IBOutlet UILabel *currentPelvicRot;
@property (weak, nonatomic) IBOutlet UILabel *currentStride;
@property (weak, nonatomic) IBOutlet UILabel *currentGrndContctTime;
@property (weak, nonatomic) IBOutlet UILabel *currentBounce;
@property (weak, nonatomic) IBOutlet UILabel *avgCadence;
@property (weak, nonatomic) IBOutlet UILabel *avgLurch;
@property (weak, nonatomic) IBOutlet UILabel *avgPelvicRot;
@property (weak, nonatomic) IBOutlet UILabel *avgStride;
@property (weak, nonatomic) IBOutlet UILabel *avgGroundContactTime;
@property (weak, nonatomic) IBOutlet UILabel *avgBounce;
- (IBAction)start:(id)sender;
- (IBAction)stop:(id)sender;

@end

