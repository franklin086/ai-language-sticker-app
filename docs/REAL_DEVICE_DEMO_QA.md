# Real Device Demo QA Report

## Milestone

MILESTONE-049E

## Version Context

Real Device Demo QA

## Goal

Record the iPhone Expo Go real-device test results for the Alpha Demo recognition flow.

This milestone only adds a QA document. It does not modify business code, Gemini, backend logic, localStorage, XP, Achievement, Daily Quest, Treasure Chest, or Audio.

---

## Test Environment

Device:

iPhone

Run Mode:

Expo Go

Frontend:

`npx expo start --clear`

Backend:

FastAPI

`http://192.168.1.20:8000`

---

## Verified Results

DEVICE-QA-001

Check Item:

Expo Go home screen opens

Result:

PASS

Issue:

None

Suggestion:

None

---

DEVICE-QA-002

Check Item:

FastAPI docs can be opened from iPhone Safari

Result:

PASS

Issue:

None

Suggestion:

None

---

DEVICE-QA-003

Check Item:

iPhone camera capture can send a recognition request to backend

Result:

PASS

Issue:

None

Suggestion:

Keep backend bound to the LAN-accessible host during real-device demos.

---

DEVICE-QA-004

Check Item:

Backend recognition endpoint returns HTTP 200

Result:

PASS

Issue:

None

Suggestion:

None

---

DEVICE-QA-005

Check Item:

Gemini returns valid recognition payload

Result:

PASS

Observed Result:

`object_en: fan`

`object_zh: 风扇`

`specific_en: desk fan`

`specific_zh: 桌面风扇`

`confidence: high`

Issue:

None

Suggestion:

None

---

DEVICE-QA-006

Check Item:

Frontend displays successful recognition result

Result:

PASS

Observed Result:

The app displayed the recognized object as:

`桌面风扇 / desk fan`

Confidence:

`High`

Issue:

None

Suggestion:

None

---

DEVICE-QA-007

Check Item:

Unmatched museum artifact is not misclassified as low confidence

Result:

PASS

Issue:

Fan is not currently part of the Alpha Demo recommended artifact set, but it is correctly handled as a real recognition sample.

Suggestion:

Keep unmatched recognized objects on the success path, while hiding story, knowledge, encyclopedia, and quiz content until the object exists in the content library.

---

DEVICE-QA-008

Check Item:

Recognition fallback reason categories are distinguishable

Result:

PASS

Verified / Supported Reasons:

- `none`
- `unmatched_museum_artifact`
- `low_confidence`
- `api_timeout`
- `backend_unreachable`
- `backend_error`
- `gemini_error`
- `invalid_response`
- `image_quality_too_low`

Issue:

None

Suggestion:

Continue using these categories during real-device QA to avoid confusing backend, Gemini, network, and content-library issues.

---

## Recorded Issues

DEVICE-QA-009

Check Item:

Fan as real-device sample

Result:

PASS

Issue:

Fan is not one of the Alpha Demo recommended artifacts.

Suggestion:

Treat fan as a valid real-device recognition sample, but do not use it as the primary Alpha Demo scripted object unless it is later added to the content library.

---

DEVICE-QA-010

Check Item:

Five Alpha Demo artifacts still require real-device verification

Result:

NEEDS_FIX

Issue:

The following Alpha Demo artifacts still need individual iPhone Expo Go validation:

- Panda
- Car
- Rocket
- Camera
- Mona Lisa

Suggestion:

Run the same real-device path for each demo artifact before final Alpha Demo presentation.

---

## Final Summary

PASS Count:

9

NEEDS_FIX Count:

1

BLOCKER Count:

0

Can Continue Alpha Demo Real-Device Presentation:

YES

Should Continue Testing Five Demo Artifacts:

YES

---

## Conclusion

The iPhone Expo Go real-device recognition path is now validated for the fan sample:

Home screen opens, iPhone can reach the FastAPI backend, backend returns HTTP 200, Gemini returns a valid high-confidence payload, and the frontend displays the successful recognition result.

The previous low-confidence misclassification has been resolved for successful high-confidence unmatched objects. Remaining work is focused on validating the five scripted Alpha Demo artifacts on the same real-device path.
