import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Save,
  CheckCircle,
} from 'lucide-react';
import { Button, Card, Input } from '../components/common';
import { cn } from '../utils/helpers';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'billing';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Corp',
    location: 'San Francisco, CA',
  });

  const tabs: { id: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-500 mt-1">Manage your account preferences</p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-neutral-200">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'profile' && (
          <>
            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    value={profile.company}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, company: e.target.value }))
                    }
                  />
                  <Input
                    label="Location"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, location: e.target.value }))
                    }
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-2">Subscription Plan</h3>
              <p className="text-sm text-neutral-500 mb-4">Current plan: Pro</p>
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl border border-primary-100">
                <div>
                  <p className="font-medium text-primary-900">Pro Plan</p>
                  <p className="text-sm text-primary-700">$19/month</p>
                </div>
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'security' && (
          <>
            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-6">Password</h3>
              <div className="space-y-4">
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm New Password" type="password" />
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <Button size="sm">Update Password</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-6">API Access</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">API Key</p>
                    <p className="text-xs text-neutral-500 font-mono">
                      js_sk_****************************a9b8
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg border border-success-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <div>
                    <p className="text-sm font-medium text-success-900">
                      Two-factor authentication enabled
                    </p>
                    <p className="text-xs text-success-700">Authenticator app</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'notifications' && (
          <Card className="p-6">
            <h3 className="font-semibold text-neutral-900 mb-6">Email Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Analysis Complete', description: 'Receive an email when a job analysis is complete' },
                { label: 'Fraud Alerts', description: 'Get notified when high-risk jobs are detected' },
                { label: 'Weekly Summary', description: 'Receive a weekly report of your analysis activity' },
                { label: 'Product Updates', description: 'Learn about new features and improvements' },
                { label: 'Security Alerts', description: 'Important security notifications for your account' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{item.label}</p>
                    <p className="text-xs text-neutral-500">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={index < 3}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'billing' && (
          <>
            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-6">Subscription Plan</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'Free', price: '$0', features: ['5 analyses/month', 'Basic reports', 'Community support'] },
                  { name: 'Pro', price: '$19', features: ['Unlimited analyses', 'OCR Scanner', 'Priority support'], current: true },
                  { name: 'Enterprise', price: '$99', features: ['API Access', 'Team features', 'SLA guarantee'] },
                ].map((plan, index) => (
                  <div
                    key={index}
                    className={cn(
                      'p-4 rounded-xl border-2',
                      plan.current
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    )}
                  >
                    <p className="font-semibold text-neutral-900">{plan.name}</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-1">
                      {plan.price}
                      <span className="text-sm text-neutral-500 font-normal">/mo</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-sm text-neutral-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.current ? 'outline' : 'primary'}
                      size="sm"
                      className="w-full mt-4"
                      disabled={plan.current}
                    >
                      {plan.current ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-6">Payment Method</h3>
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">•••• •••• •••• 4242</p>
                    <p className="text-xs text-neutral-500">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Billing History</h3>
              <div className="space-y-2">
                {[
                  { date: 'Jun 1, 2024', amount: '$19.00', status: 'Paid' },
                  { date: 'May 1, 2024', amount: '$19.00', status: 'Paid' },
                  { date: 'Apr 1, 2024', amount: '$19.00', status: 'Paid' },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-neutral-100">
                    <span className="text-sm text-neutral-600">{invoice.date}</span>
                    <span className="text-sm font-medium text-neutral-900">{invoice.amount}</span>
                    <span className="text-sm text-success-600">{invoice.status}</span>
                    <button className="text-sm text-primary-600 hover:text-primary-700">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4 justify-end">
        {saved && (
          <div className="flex items-center gap-2 text-success-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            Settings saved
          </div>
        )}
        <Button onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
