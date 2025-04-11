# 📊 Dashboard Analytics API Documentation

## Overview

This API provides analytics data for SMS and Email messages, including:

- Monthly and daily data trends
- Total messages sent
- Current month statistics
- Monthly progress towards target
- Percentage change from last month

---

## 🔗 Endpoint

### `GET /api/analytics`

Fetches analytics data for dashboard visualizations.

---

## ✅ Response Format

### **Success Response**

```json
{
  "success": true,
  "data": {
    "monthlyEmailAndSmsSeries": [
      {
        "name": "Email",
        "year": ["Jan", "Feb", ..., "Dec"],
        "data": [123, 456, ..., 789]
      },
      {
        "name": "Sms",
        "year": ["Jan", "Feb", ..., "Dec"],
        "data": [234, 567, ..., 890]
      }
    ],
    "dailyEmailAndSmsSeries": [
      {
        "name": "Email",
        "day": ["05-04-2025", "06-04-2025", ..., "11-04-2025"],
        "data": [10, 15, ..., 9]
      },
      {
        "name": "Sms",
        "day": ["05-04-2025", "06-04-2025", ..., "11-04-2025"],
        "data": [20, 18, ..., 11]
      }
    ],
    "totalSmsSent": 12345,
    "totalEmailSent": 6789,
    "currentMonthSms": 2345,
    "currentMonthEmail": 1234,
    "emailPercentChange": "12.50",
    "smsPercentChange": "-3.75",
    "smsProgressPercent": "23.45",
    "emailProgressPercent": "12.34"
  }
}
