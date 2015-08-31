//
//  ViewController.m
//  iOSJSBridge
//
//  Created by Niladri Bora on 8/28/15.
//  Copyright © 2015 LUMO Bodytech. All rights reserved.
//

#import "MainScreenViewController.h"
@import JavaScriptCore;

NSString* const sampleSize = @"1";

@interface MainScreenViewController ()
@property(strong, nonatomic) JSContext* js;
@end

@implementation MainScreenViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSString* path = [[NSBundle mainBundle] pathForResource:@"coach" ofType:@"js"];
    NSString* jsStr = [[NSString alloc]
                       initWithData:[NSData dataWithContentsOfFile:path]
                                    encoding:NSUTF8StringEncoding];
    self.js = [JSContext new];
    [self.js evaluateScript:jsStr];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)start:(id)sender {
    [self.js evaluateScript:@"calc(test_data)"];
    JSValue* avgBounce = [self.js evaluateScript:@"avg.bounce"];
    self.avgBounce.text = [avgBounce toString];
}

- (IBAction)stop:(id)sender {
}
@end
