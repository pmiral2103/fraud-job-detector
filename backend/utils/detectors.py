import re
from typing import Dict, List, Tuple

# Suspicious public/free email domains often used in scams instead of company domains
SUSPICIOUS_EMAIL_DOMAINS = {
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", 
    "aol.com", "zoho.com", "mail.com", "protonmail.com", "proton.me", 
    "icloud.com", "gmx.com", "yandex.com", "inbox.com", "fastmail.com",
    "tempmail.com", "guerrillamail.com"
}

def detect_registration_fee(text: str) -> Tuple[bool, List[str]]:
    """Detects registration/application fee demands."""
    patterns = [
        r"(?:registration|application|processing|admin|signup|sign-up|onboarding)\s*fee",
        r"pay\s+(?:us\s+)?(?:\d+|a\s+small)\s*(?:dollars|usd|rs|rupees|pounds|gbp|fee|charge)?\s*(?:to\s+apply|for\s+processing|before\s+starting)",
        r"(?:upfront|advance)\s*payment\s*(?:required|to\s+start)",
        r"payment\s*for\s*(?:background\s*check|application\s*processing)",
        r"fee\s*to\s*(?:register|apply)"
    ]
    reasons = []
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            reasons.append("Request for upfront application, processing, or registration fee.")
            break
    return len(reasons) > 0, reasons

def detect_training_fee(text: str) -> Tuple[bool, List[str]]:
    """Detects requirements to pay for training, certification, or learning materials."""
    patterns = [
        r"(?:mandatory|paid|required)\s*training\s*(?:fee|cost|charge|payment)",
        r"pay\s+for\s*(?:training|certification|materials|modules)",
        r"training\s*package\s*(?:costs|is\s*(?:\d+|\$\d+))",
        r"purchase\s*(?:training|learning|educational)\s*materials"
    ]
    reasons = []
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            reasons.append("Demand for training fees or purchasing mandatory certification/training materials.")
            break
    return len(reasons) > 0, reasons

def detect_security_deposit(text: str) -> Tuple[bool, List[str]]:
    """Detects requests for equipment deposits or security deposits."""
    patterns = [
        r"security\s*deposit",
        r"refundable\s*deposit\s*(?:for|on)\s*(?:laptop|equipment|tools|software)",
        r"deposit\s*(?:needed|required)\s*(?:to\s+receive|for\s+insurance)",
        r"pay\s*deposit\s*(?:before|for)\s*(?:dispatch|shipping|delivery)"
    ]
    reasons = []
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            reasons.append("Request for a security deposit or equipment/laptop deposit.")
            break
    return len(reasons) > 0, reasons

def detect_easy_money(text: str) -> Tuple[bool, List[str]]:
    """Detects 'get rich quick' claims and unrealistic ease of work."""
    patterns = [
        r"get\s*rich\s*quick",
        r"easy\s*money",
        r"earn\s*(?:\$\d{3,}|\d{4,})\s*(?:daily|per\s*day|every\s*day|hourly|per\s*hour|a\s*week|weekly)",
        r"no\s*skills\s*(?:required|needed)",
        r"make\s*(?:\d+|thousands)\s*with\s*(?:no|minimal)\s*effort",
        r"guaranteed\s*(?:income|salary|payout|return)",
        r"lazy\s*way\s*to\s*earn",
        r"earn\s*while\s*you\s*sleep"
    ]
    reasons = []
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            reasons.append("Guaranteed high-income or 'easy money' claims with little to no skills/effort required.")
            break
    return len(reasons) > 0, reasons

def detect_wfh_scams(text: str) -> Tuple[bool, List[str]]:
    """Detects high-risk Work From Home / Remote scam patterns (reshipping, envelope stuffing, mystery shopper, etc.)."""
    # Simply mentioning "work from home" or "remote" is not a scam, 
    # but when combined with suspicious tasks (reshipping, package forwarding, processing payments, envelope stuffing) 
    # or combined with "no resume/no experience/instant cash"
    scam_tasks = [
        r"envelope\s*stuffing",
        r"package\s*(?:forwarding|reshipping|handler|processing)",
        r"mystery\s*shopper",
        r"receive\s*and\s*ship",
        r"payment\s*processing\s*agent",
        r"financial\s*agent\s*(?:to\s*receive|handling\s*wire)"
    ]
    
    reasons = []
    for pattern in scam_tasks:
        if re.search(pattern, text, re.IGNORECASE):
            reasons.append(f"Work-from-home scam indicators: Suspicious task category detected ({pattern.replace(r's*', ' ').replace(r'?', '')}).")
            return True, reasons
            
    # Or WFH combined with no experience + high salary
    has_wfh = re.search(r"(?:work\s*from\s*home|wfh|home-based|work\s*at\s*home|remote\s*job)", text, re.IGNORECASE)
    has_low_barrier = re.search(r"(?:no\s*experience|no\s*resume|anyone\s*can\s*apply|no\s*background\s*check)", text, re.IGNORECASE)
    has_high_pay = re.search(
        r"(?:high\s*pay|great\s*income|lucrative|earn\s+(?:up\s+to\s+)?\$\s*\d{2,}/(?:hr|hour)|earn\s+(?:up\s+to\s+)?\$\s*\d{3,}/day)",
        text, 
        re.IGNORECASE
    )
    
    if has_wfh and has_low_barrier and has_high_pay:
        reasons.append("Unusually high-paying work-from-home job requiring no prior experience or resume.")
        return True, reasons
        
    return False, []

def detect_no_interview(text: str) -> Tuple[bool, List[str]]:
    """Detects offers of employment without standard interview processes."""
    patterns = [
        r"no\s*interview\s*(?:required|needed|necessary)",
        r"direct\s*(?:hiring|placement|hire|selection|joining)",
        r"skip\s*(?:the\s*)?interview",
        r"instant\s*job\s*offer",
        r"no\s*formal\s*interview",
        r"hiring\s*without\s*interview"
    ]
    reasons = []
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            reasons.append("Job offer guaranteed without a standard interview or evaluation process.")
            break
    return len(reasons) > 0, reasons

def detect_immediate_joining(text: str) -> Tuple[bool, List[str]]:
    """Detects high-pressure 'immediate joining' tactics, especially if combined with low barriers."""
    patterns = [
        r"start\s*(?:today|tonight|immediately|tomorrow)",
        r"immediate\s*(?:joining|start|hiring|hire|deployment)",
        r"must\s*join\s*immediately",
        r"urgent\s*joining\s*(?:today|within\s*\d+\s*hours)"
    ]
    reasons = []
    
    # We check if there's immediate start AND some other suspicious element like "no interview" or "fee" or "easy money"
    # to avoid false positives on legitimate urgent listings. Or if the text uses highly aggressive immediate joining phrasing.
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            # If aggressive phrasing is matched, flag it as immediate joining pressure
            if re.search(r"(?:start\s*tonight|start\s*today|immediate\s*joining\s*without|join\s*today\s*start)", text, re.IGNORECASE):
                reasons.append("Urgent 'start today/tonight' pressure, commonly used to bypass candidate due diligence.")
                return True, reasons
            # General immediate start flag
            reasons.append("High-pressure immediate joining / start-today demand.")
            break
            
    return len(reasons) > 0, reasons

def detect_unrealistic_salary(text: str) -> Tuple[bool, List[str]]:
    """Detects salary claims that are highly unrealistic for standard/entry-level jobs."""
    # Matches patterns like "$100/hr", "$250/hour", "$5000/week", "7000/week", "$20000/month"
    patterns = [
        r"\$\s*[4-9]\d\s*/\s*(?:hour|hr)", # $40-$99/hr (highly suspicious unless senior role, but flagged for review)
        r"\$\s*[1-9]\d{2,}\s*/\s*(?:hour|hr)", # $100+/hr
        r"\$\s*[2-9]\d{3,}\s*/\s*(?:week|wk|month|mo)", # $2000+/week or month
        r"earn\s*up\s*to\s*\$\s*\d{4,}\s*(?:weekly|monthly)",
        r"salary\s*(?:up\s*to\s*)?\$\s*\d{5,}\s*(?:per\s*month|monthly|a\s*month)"
    ]
    
    reasons = []
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            reasons.append(f"Highly unrealistic salary offer detected ({match.group(0)}).")
            break
            
    # Also check generic claims of extremely high income
    if not reasons and re.search(r"(?:unbelievable|unrealistic|huge|massive)\s*(?:salary|income|pay|payouts)", text, re.IGNORECASE):
        reasons.append("Vague claims of extremely high or guaranteed compensation.")
        
    return len(reasons) > 0, reasons

def detect_suspicious_email(text: str) -> Tuple[bool, List[str]]:
    """Extracts email addresses from the text and checks if they use free/public domains instead of corporate ones."""
    # Standard email regex
    email_pattern = r"[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})"
    emails = re.findall(email_pattern, text)
    
    reasons = []
    for email_domain in emails:
        domain_lower = email_domain.lower()
        if domain_lower in SUSPICIOUS_EMAIL_DOMAINS:
            reasons.append(f"Recruiter email uses a public/free domain (@{email_domain}) rather than an official corporate domain.")
            return True, reasons
            
    # If there's an email check but it matches common scam email structures (e.g. random letters/numbers)
    # We'll stick to free domains as the primary indicator for simplicity and reliability.
    return False, []

def detect_missing_company_info(text: str) -> Tuple[bool, List[str]]:
    """Detects when essential company information is missing or intentionally hidden."""
    # Look for terms indicating anonymous listings
    confidential_patterns = [
        r"(?:confidential|anonymous|undisclosed|private|leading|reputed)\s+(?:employer|client|company|recruiter|organization)",
        r"name\s*of\s*company\s*:\s*(?:confidential|not\s*disclosed)",
        r"company\s*name\s*:\s*(?:confidential|not\s*disclosed)"
    ]
    
    reasons = []
    for pattern in confidential_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            reasons.append("Company identity is kept confidential or undisclosed.")
            return True, reasons
            
    # Check if standard company indicators like "Inc.", "Ltd.", "LLC", "Corp.", "Company" are completely missing, 
    # and there is no "About the Company" or "About Us" section.
    # We will look for presence of these words. If absent AND text is short, it's a suspicious listing.
    has_company_keywords = re.search(r"\b(?:company|corporation|corp|inc|ltd|llc|group|association|firm|agency)\b", text, re.IGNORECASE)
    if not has_company_keywords and len(text) < 500:
        reasons.append("Missing standard company details, description, or official business identifiers in a very short posting.")
        return True, reasons
        
    return False, []

def run_all_detectors(text: str) -> Dict[str, Tuple[bool, List[str]]]:
    """Runs all 10 detectors on the input job text and returns the results."""
    return {
        "registration_fee": detect_registration_fee(text),
        "training_fee": detect_training_fee(text),
        "security_deposit": detect_security_deposit(text),
        "easy_money": detect_easy_money(text),
        "wfh_scam": detect_wfh_scams(text),
        "no_interview": detect_no_interview(text),
        "immediate_joining": detect_immediate_joining(text),
        "unrealistic_salary": detect_unrealistic_salary(text),
        "suspicious_email": detect_suspicious_email(text),
        "missing_company_info": detect_missing_company_info(text)
    }
