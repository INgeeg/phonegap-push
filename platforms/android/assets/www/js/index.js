/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 // Setup push notifications:

 
/**
 * Success handler for when connected to push server
 * @param result
 */
var pushSuccessHandler = function(result)
{
    console.log(result);
};
 
/**
 * Error handler for when not connected to push server
 * @param error
 */
var pushErrorHandler = function(error)
{
    console.log(error);
};
 
/**
 * Notification from Android GCM
 * @param e
 */
window.onNotificationGCM = function(e)
{
    // Check which event:
	console.log(e.regid);
    switch(e.event)
    {
        case 'registered' :
        {
            console.log('android reg id: ' + e.regid);
            break;
        }
    }
};
 
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
		var pushNotification = window.plugins.pushNotification;

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		try
		{
			console.log("push insiide");
			if (window.device.platform == 'android' || device.platform == 'Android') {
				// Register for Android:
				pushNotification.register(
					pushSuccessHandler,
					pushErrorHandler, {
						"senderID":"705444887387", // Project number from Google Developer Console
						"ecb":"onNotificationGCM"
					}
				);
			}
		}
		catch(err)
		{
			// For this example, we'll fail silently ...
			console.log(err);
		}
		
    }
};

app.initialize();

