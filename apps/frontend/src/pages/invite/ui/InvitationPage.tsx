import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Result } from 'antd';
import { MailOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAcceptInvitation } from '@/features/invitation-accept/model/useAcceptInvitation';
import { useSession } from '@/entities/session';

export const InvitationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { isAuthenticated } = useSession();

  const {
    invitation,
    loading,
    error,
    isAccepting,
    handleAccept,
    isWrongUser,
    userEmail,
  } = useAcceptInvitation(token || '');

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Result
          status="error"
          title="Invalid Invitation Link"
          subTitle="No invitation token was found in the URL."
          extra={<Button type="primary" onClick={() => navigate('/')}>Go to Home</Button>}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
        <Spin size="large" />
        <p className="text-gray-500 font-poppins">Loading invitation details...</p>
      </div>
    );
  }

  // Handle GraphQL error or invitation not found
  if (error || !invitation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Result
          status="warning"
          title="Invitation Not Found"
          subTitle={error?.message || "The invitation link is invalid or no longer exists."}
          extra={<Button type="primary" onClick={() => navigate('/')}>Go to Home</Button>}
        />
      </div>
    );
  }

  // Handle already accepted
  if (invitation.status === 'ACCEPTED') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Result
          status="success"
          icon={<CheckCircleOutlined />}
          title="Invitation Already Accepted"
          subTitle="You are already a member of this workspace."
          extra={<Button type="primary" onClick={() => navigate('/contentbay/workspaces')}>Go to Dashboard</Button>}
        />
      </div>
    );
  }

  // Handle expired
  if (invitation.status === 'EXPIRED' || new Date() > new Date(invitation.expiresAt)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Result
          status="error"
          title="Invitation Expired"
          subTitle="This invitation is no longer valid. Please request a new invitation from your workspace administrator."
        />
      </div>
    );
  }

  // Handle revoked
  if (invitation.status === 'REVOKED') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Result
          status="error"
          title="Invitation Revoked"
          subTitle="This invitation has been cancelled by the workspace administrator."
        />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <MailOutlined className="text-2xl text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold font-poppins text-gray-800 mb-2">Join {invitation.workspace.name}</h2>
          <p className="text-gray-500 mb-6">
            You have been invited by <strong>{invitation.inviter.firstName} {invitation.inviter.lastName}</strong> to join as a <strong>{invitation.role}</strong>.
          </p>
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-6 text-sm text-left">
            <WarningOutlined className="mr-2" />
            You need to be signed in as <strong>{invitation.email}</strong> to accept this invitation.
          </div>
          <Button type="primary" size="large" block onClick={() => navigate('/auth/login')}>
            Sign In / Register
          </Button>
        </div>
      </div>
    );
  }

  // Wrong user
  if (isWrongUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Result
            status="warning"
            title="Account Mismatch"
            subTitle={
              <div className="text-left mt-4">
                <p className="mb-2">This invitation was sent to: <strong>{invitation.email}</strong></p>
                <p>You are currently signed in as: <strong>{userEmail}</strong></p>
              </div>
            }
            extra={
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-gray-500 text-sm">Please sign in using the correct account.</p>
                <Button block onClick={() => navigate('/auth/login')}>Switch Account</Button>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  // Ready to accept
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MailOutlined className="text-2xl text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold font-poppins text-gray-800 mb-2">Join {invitation.workspace.name}</h2>
        <p className="text-gray-500 mb-8">
          You have been invited by <strong>{invitation.inviter.firstName} {invitation.inviter.lastName}</strong> ({invitation.inviter.email}) to join as a <strong>{invitation.role}</strong>.
        </p>
        
        <Button 
          type="primary" 
          size="large" 
          block 
          onClick={handleAccept} 
          loading={isAccepting}
        >
          Accept Invitation
        </Button>
      </div>
    </div>
  );
};
